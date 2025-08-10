const { Transactions } = require('../../models');
const buildWhereClause = require('../../helpers/build_where_clause.helper');


const getByUserIdTransactionService = async (user_id, transaction, page = 1, filters = {}) => {
  let datetimeFilter = {};
  if (filters.from && filters.to) {
    datetimeFilter = { $between: [filters.from, filters.to] };
  } else if (filters.from) {
    datetimeFilter = { $gte: filters.from };
  } else if (filters.to) {
    datetimeFilter = { $lte: filters.to };
  }

  const filter = {
    datetime: Object.keys(datetimeFilter).length ? datetimeFilter : undefined,
    type: filters.type ? { $in: Array.isArray(filters.type) ? filters.type : [filters.type] } : undefined
  };

  const limit = 50;
  const offset = (page - 1) * limit;
  const where = buildWhereClause(user_id, filter);
  return await Transactions.findAll({
    where,
    attributes: { exclude: [''] }, // No sensitive fields in Transactions
    limit,
    offset,
    ...(transaction ? { transaction } : {} )
  });
};

module.exports = getByUserIdTransactionService;
