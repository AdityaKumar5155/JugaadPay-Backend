const { Users } = require('../../models');

/**
 * Get a user by ID
 * @param {number} userId
 * @returns {Promise<Object|null>} User instance or null if not found
 */
const getByIdUserService = async (userId, transaction) => {
  return await Users.findByPk(userId, {
    attributes: { exclude: ['password'] },
    ...(transaction ? { transaction } : {})
  });
};

module.exports = getByIdUserService;
