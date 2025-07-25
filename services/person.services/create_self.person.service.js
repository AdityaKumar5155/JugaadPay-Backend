const { Persons } = require('../../models');

/**
 * Creates a 'self' person for a user (debt_amount = 0)
 * @param {Object} personData - { first_name, last_name, mobile, email, nickname }
 * @param {number} user_id - The user ID to associate
 * @returns {Promise<Object>} Created person instance
 */
const createSelfPersonService = async (personData, user_id, transaction) => {
  try {
    const person = await Persons.create({ ...personData, user_id, debt_amount: 0, is_self: true }, transaction ? { transaction } : undefined);
    return person;
  } catch (error) {
    throw error;
  }
};

module.exports = createSelfPersonService;
