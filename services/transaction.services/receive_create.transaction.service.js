const { TRANSACTION_TYPES } = require('../../constants');
const { Transactions, Persons, Transaction_Payees } = require('../../models');

/**
 * Creates a 'Receive' transaction
 * @param {Object} transactionData - { amount, datetime, description, payer_id }
 * @param {number} user_id - The user ID to associate
 * @param {Object} [transaction] - Optional transaction
 * @returns {Promise<Object>} Created transaction instance
 */
async function createReceivedTransaction(transactionData, user_id, transaction) {
  const { payer_id, ...txData } = transactionData;
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

    // Receive: payer is not self person, payee is self person
    const transactionInstance = await Transactions.create({ ...txData, user_id, payer_id, type: TRANSACTION_TYPES.RECEIVED }, { transaction: t });
    const amount = txData.amount;
    // Deduct debt_amount from payer
    await Persons.increment(
      { debt_amount: -amount },
      { where: { id: payer_id }, transaction: t }
    );
    // Increase debt_amount of self person
    if (selfPersonId) {
      await Persons.increment(
        { debt_amount: amount },
        { where: { id: selfPersonId }, transaction: t }
      );
      // Create transaction_payees entry for self person
      await Transaction_Payees.create({ transaction_id: transactionInstance.id, payee_id: selfPersonId, amount }, { transaction: t });
    }
    if (createdTransaction) await t.commit();
    return transactionInstance;
  } catch (error) {
    if (createdTransaction && t) await t.rollback();
    throw error;
  }
}

module.exports = createReceivedTransaction;
