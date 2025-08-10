const { Users } = require('../../models');
const compareHash = require('../../helpers/compare_hash.helper');
const createHash = require('../../helpers/create_hash.helper');

// Change password for authenticated user using old password
const changePasswordService = async (userId, oldPassword, newPassword) => {
  if (!userId || !oldPassword || !newPassword) {
    throw new Error('userId, oldPassword and newPassword are required');
  }
  const user = await Users.findByPk(userId);
  if (!user) throw new Error('User not found');
  const match = await compareHash(oldPassword, user.password);
  if (!match) throw new Error('Invalid old password');
  const hashed = await createHash(newPassword);
  await user.update({ password: hashed });
  return true;
};

module.exports = changePasswordService;
