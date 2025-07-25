const { Persons } = require('../../models');

/**
 * Get a person by ID
 * @param {number} personId
 * @returns {Promise<Object|null>} Person instance or null if not found
 */
const getPersonByIdService = async (personId, userId, transaction) => {
    const person = await Persons.findOne({
        where: {
            id: personId,
            user_id: userId // Ensure the person belongs to the user
        },
        ...(transaction ? { transaction } : {})
    })
    return person;
};

module.exports = getPersonByIdService;
