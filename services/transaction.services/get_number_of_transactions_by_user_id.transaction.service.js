const { Transactions } = require('../../models');
const buildWhereClause = require('../../helpers/build_where_clause.helper');

const getNumberOfTransactionsByUserId = async (user_id, transaction, filters = {}) => {
  let datetimeFilter = {};
  if (filters.from && filters.to) {
    datetimeFilter = { $between: [filters.from, filters.to] };
  } else if (filters.from) {
    datetimeFilter = { $gte: filters.from };
  } else if (filters.to) {
    datetimeFilter = { $lte: filters.to };
  }

  const filter = {
    
  };
  if (Object.keys(datetimeFilter).length) {
    filter.datetime = datetimeFilter;
  }
  if (filters.type) {
    filter.type = { $in: Array.isArray(filters.type) ? filters.type : [filters.type] };
  }


  const where = buildWhereClause(user_id, filter);
  return await Transactions.count({
    where,
    ...(transaction ? { transaction } : {})
  });
};

module.exports = getNumberOfTransactionsByUserId;
