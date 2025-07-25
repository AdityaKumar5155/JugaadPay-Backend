const { Persons } = require('../../models');

/**
 * Get all persons for a user
 * @param {number} user_id
 * @returns {Promise<Array>} Array of person instances
 */
const getByUserIdPersonService = async (user_id, transaction) => {
  return await Persons.findAll({ where: { user_id }, ...(transaction ? { transaction } : {}) });
};

module.exports = getByUserIdPersonService;
