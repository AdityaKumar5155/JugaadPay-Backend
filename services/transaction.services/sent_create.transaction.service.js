const { TRANSACTION_TYPES } = require('../../constants');
const { Transactions, Persons, Transaction_Payees } = require('../../models');

/**
 * Creates a 'Sent' transaction
 * @param {Object} transactionData - { amount, datetime, description, payees }
 * @param {number} user_id - The user ID to associate
 * @param {Object} [transaction] - Optional transaction
 * @returns {Promise<Object>} Created transaction instance
 */
async function createSentTransaction(transactionData, user_id, transaction) {
  const { payees, ...txData } = transactionData;
  let t = transaction;
  let createdTransaction = false;
  if (!t) {
    t = await Transactions.sequelize.transaction();
    createdTransaction = true;
  }
  try {
    // Find self person id for user
    const selfPerson = await Persons.findOne({ where: { user_id, is_self: true }, transaction: t });
    const selfPersonId = selfPerson ? selfPerson.id : null;

    // Sent: payer is self person, payees are others
    const transactionInstance = await Transactions.create({ ...txData, user_id, payer_id: selfPersonId, type: TRANSACTION_TYPES.SENT }, { transaction: t });
    if (Array.isArray(payees)) {
      for (const payee of payees) {
        const { payee_id, amount } = payee;
        // Increase debt_amount of payee
        await Persons.increment(
          { debt_amount: amount },
          { where: { id: payee_id }, transaction: t }
        );
        // Create transaction_payees entry
        await Transaction_Payees.create({ transaction_id: transactionInstance.id, payee_id, amount }, { transaction: t });
      }
    }
    if (createdTransaction) await t.commit();
    return transactionInstance;
  } catch (error) {
    if (createdTransaction && t) await t.rollback();
    throw error;
  }
}

module.exports = { createSentTransaction };
