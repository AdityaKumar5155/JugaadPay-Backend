const { Persons } = require('../../models');

/**
 * Updates the 'self' person for a user (person with debt_amount = 0 and user_id)
 * @param {number} user_id - The user ID whose self person to update
 * @param {Object} updateData - Fields to update
 * @param {Object} [transaction] - Optional transaction
 * @returns {Promise<Object|null>} Updated person instance or null if not found
 */
const updateSelfPersonService = async (user_id, updateData, transaction) => {
  try {
    const person = await Persons.findOne({ where: { user_id, is_self: true } });
    if (!person) return null;
    await person.update(updateData, transaction ? { transaction } : undefined);
    return person;
  } catch (error) {
    throw error;
  }
};

module.exports = updateSelfPersonService;
