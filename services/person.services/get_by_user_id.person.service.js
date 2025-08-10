
const buildWhereClause = require('../../helpers/build_where_clause.helper');
const { Persons } = require('../../models');
const { Op } = require('sequelize');

/**
 * Get all persons for a user
 * @param {number} user_id
 * @returns {Promise<Array>} Array of person instances
 */

/**
 * Enhanced filter builder for Sequelize queries
 * Supports operators like $like, $gte, $lte, $in, etc.
 */


const getByUserIdPersonService = async (user_id, transaction, page = 1, filters = {}) => {
  const limit = 50;
  const offset = (page - 1) * limit;

  const filter = {
    mobile: filters.mobile ? { $like: `%${filters.mobile}%` } : undefined,
    email: filters.email ? { $iLike: `%${filters.email}%` } : undefined
  };

  const where = buildWhereClause(user_id, filter);

  let options = {
    where,
    limit,
    offset,
    ...(transaction ? { transaction } : {})
  };

  if (filters.name) {
    options.where = {
      ...where,
      [Op.and]: [
        ...Object.entries(where).map(([k, v]) => ({ [k]: v })),
        Sequelize.where(
          Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),
          { [Op.iLike]: `%${filters.name}%` }
        )
      ]
    };
  }

  return await Persons.findAll(options);
};

module.exports = getByUserIdPersonService;
