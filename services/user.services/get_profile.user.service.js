const getProfileUserService = async (userId, transaction) => {
  // Exclude sensitive fields
  const { Users } = require('../../models');
  return await Users.findByPk(userId, {
    attributes: { exclude: ['password'] },
    ...(transaction ? { transaction } : {})
  });
};

module.exports = getProfileUserService;
