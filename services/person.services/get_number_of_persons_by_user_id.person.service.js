const { Persons } = require('../../models');

/**
 * Get the count of persons for a user
 * @param {number} user_id
 * @param {object} transaction - Optional Sequelize transaction
 * @param {object} filters - Optional filters for query
 * @returns {Promise<number>} Count of persons
 */
const getNumberOfPersonsByUserIdPersonService = async (user_id, transaction = null, filters = {}) => {
  const where = { user_id, ...filters };
  return await Persons.count({
    where,
    ...(transaction ? { transaction } : {})
  });
};

module.exports = getNumberOfPersonsByUserIdPersonService;
