const { Persons } = require('../../models');

/**
 * Creates a new person
 * @param {Object} personData - { first_name, last_name, mobile, email, nickname }
 * @param {number} user_id - The user ID to associate
 * @returns {Promise<Object>} Created person instance
 */
async function createPerson(personData, user_id, transaction) {
  try {
    const person = await Persons.create({ ...personData, user_id }, transaction ? { transaction } : undefined);
    return person;
  } catch (error) {
    throw error;
  }
}

module.exports = { createPerson };
