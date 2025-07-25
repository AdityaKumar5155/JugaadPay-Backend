const { Persons } = require('../../models');

/**
 * Get a person by ID
 * @param {number} personId
 * @returns {Promise<Object|null>} Person instance or null if not found
 */
const getPersonByIdService = async (personId, transaction) => {
  return await Persons.findByPk(personId, transaction ? { transaction } : undefined);
};

/**
 * Get all persons for a user
 * @param {number} user_id
 * @returns {Promise<Array>} Array of person instances
 */
const getPersonsByUserIdService = async (user_id, transaction) => {
  return await Persons.findAll({ where: { user_id }, ...(transaction ? { transaction } : {}) });
};

