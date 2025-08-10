const { Users } = require('../../models');

const getProfileUserService = async (userId, transaction) => {
  return await Users.findByPk(userId, {
    attributes: { exclude: ['password'] },
    ...(transaction ? { transaction } : {})
  });
};

module.exports = getProfileUserService;
