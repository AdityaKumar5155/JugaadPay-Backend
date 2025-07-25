const { Persons } = require('../../models');

/**
 * Updates a person by ID
 * @param {number} personId - The ID of the person to update
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object|null>} Updated person instance or null if not found
 */
async function updatePerson(personId, updateData, transaction) {
  try {
    const person = await Persons.findByPk(personId);
    if (!person) return null;
    await person.update(updateData, transaction ? { transaction } : undefined);
    return person;
  } catch (error) {
    throw error;
  }
}

module.exports = { updatePerson };
