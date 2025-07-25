const { Persons } = require('../../models');

/**
 * Get a person by ID
 * @param {number} personId
 * @returns {Promise<Object|null>} Person instance or null if not found
 */
const getByIdPersonService = async (personId, transaction) => {
  return await Persons.findByPk(personId, transaction ? { transaction } : undefined);
};

module.exports = getByIdPersonService;
