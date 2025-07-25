const { Users } = require('../../models');

const getByEmailUserService = async (email, transaction) => {
  return await Users.findOne({
    where: { email },
    ...(transaction ? { transaction } : {})
  });
};

module.exports = getByEmailUserService;
