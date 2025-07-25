const { Transaction_Payees } = require('../../models');

/**
 * Get all payees for a transaction
 * @param {number} transaction_id
 * @returns {Promise<Array>} Array of transaction payee instances
 */
const getTransactionPayeesService = async (transaction_id) => {
  return await Transaction_Payees.findAll({ where: { transaction_id } });
};

module.exports = getTransactionPayeesService;
