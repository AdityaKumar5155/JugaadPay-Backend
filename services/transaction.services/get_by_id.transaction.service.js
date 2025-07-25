const { Transactions } = require('../../models');

/**
 * Get a transaction by ID
 * @param {number} transactionId
 * @returns {Promise<Object|null>} Transaction instance or null if not found
 */
const getByIdTransactionService = async (transactionId, transaction) => {
  return await Transactions.findByPk(transactionId, transaction ? { transaction } : undefined);
};

module.exports = getByIdTransactionService;
