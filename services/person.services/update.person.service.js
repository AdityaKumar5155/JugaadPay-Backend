const { Persons } = require('../../models');

/**
 * Updates a person by ID
 * @param {number} personId - The ID of the person to update
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object|null>} Updated person instance or null if not found
 */
const updatePersonService = async (personId, updateData, userId, transaction) => {
  try {
    const person = await Persons.findByPk({
        where: { id: personId, user_id: userId }
    });
    if (!person) return null;
    await person.update(updateData, transaction ? { transaction } : undefined);
    return person;
  } catch (error) {
    throw error;
  }
};

module.exports = updatePersonService;
