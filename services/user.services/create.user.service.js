const { Users } = require('../../models');
const createSelfPersonService = require('../person.services/create_self.person.service');

/**
 * Creates a new user
 * @param {Object} userData - { first_name, last_name, mobile, email, password }
 * @returns {Promise<Object>} Created user instance
 */
const createUserService = async (userData, transaction) => {
  let t = transaction;
  let createdTransaction = false;
  if (!t) {
    t = await Users.sequelize.transaction();
    createdTransaction = true;
  }
  try {
    const user = await Users.create(userData, { transaction: t });
    await createSelfPersonService({
      first_name: user.first_name,
      last_name: user.last_name,
      mobile: user.mobile,
      email: user.email,
      nickname: "You"
    }, user.id, t);
    if (createdTransaction) await t.commit();
    return user;
  } catch (error) {
    if (createdTransaction && t) await t.rollback();
    throw error;
  }
};

module.exports = createUserService;
