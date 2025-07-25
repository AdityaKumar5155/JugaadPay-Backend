const { Transactions } = require('../../models');

/**
 * Get a transaction by ID
 * @param {number} transactionId
 * @returns {Promise<Object|null>} Transaction instance or null if not found
 */
const getTransactionByIdService = async (transactionId) => {
  return await Transactions.findByPk(transactionId);
};

module.exports = getTransactionByIdService;
