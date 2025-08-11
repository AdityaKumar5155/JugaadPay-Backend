const { Users, Persons } = require('../../models');

const getProfileUserService = async (userId, transaction) => {
  return await Users.findByPk(userId, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Persons,
        as: 'persons',
        where: {is_self: true},
        attributes: ['debt_amount']
      }
    ],
    ...(transaction ? { transaction } : {})
  });
};

module.exports = getProfileUserService;
