const { Transactions, Transaction_Payees,Persons } = require('../../models');

/**
 * Get a transaction by ID
 * @param {number} transactionId
 * @returns {Promise<Object|null>} Transaction instance or null if not found
 */
const getByIdTransactionService = async (transactionId, transaction) => {
  return await Transactions.findOne({
    where: { id: transactionId },
    include: [
      {
        model: Transaction_Payees,
        as: 'payees',
        include: [
          {
            model: Persons,
            as: 'person',
            attributes: ['id', 'first_name', 'last_name', 'mobile', 'email']
          }
        ]
      }
    ]
  }, transaction ? { transaction } : undefined);
};

module.exports = getByIdTransactionService;
