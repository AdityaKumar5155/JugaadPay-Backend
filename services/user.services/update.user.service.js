const { Users } = require('../../models');
const updateSelfPersonService = require('../../services/person.services/update_self.person.service');

/**
 * Updates a user by ID
 * @param {number} userId - The ID of the user to update
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object|null>} Updated user instance or null if not found
 */
const updateUserService = async (userId, updateData, transaction) => {
  try {
    const user = await Users.findByPk(userId);
    if (!user) return null;
    await user.update(updateData, transaction ? { transaction } : undefined);
    // Update self person for this user
    await updateSelfPersonService(userId, {
      first_name: user.first_name,
      last_name: user.last_name,
      mobile: user.mobile,
      email: user.email
    }, transaction);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = updateUserService;
