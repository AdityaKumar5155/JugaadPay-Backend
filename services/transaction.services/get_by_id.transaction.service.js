const { Transactions, Transaction_Payees,Persons } = require('../../models');

/**
 * Get a transaction by ID
 * @param {number} transactionId
 * @returns {Promise<Object|null>} Transaction instance or null if not found
 */
const getByIdTransactionService = async (transactionId, transaction) => {
  const transactionRecord = await Transactions.findOne({
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
      },
      {
        model: Persons,
        as: 'payer',
        attributes: ['first_name', 'last_name']
      }
    ]
  }, transaction ? { transaction } : undefined);
  console.log('Fetched transaction by ID:', JSON.stringify(transactionRecord, null, 2));
  return transactionRecord;
};

module.exports = getByIdTransactionService;
