const { Transactions, Persons } = require('../../models');
const buildWhereClause = require('../../helpers/build_where_clause.helper');


const getByUserIdTransactionService = async (user_id, transaction, filters = {}) => {
  const filter = {};

  if (filters.month && filters.year) {
    const startDate = new Date(filters.year, filters.month - 1, 1);
    const endDate = new Date(filters.year, filters.month, 0, 23, 59, 59, 999);
    filter.datetime = { $between: [startDate, endDate] };
  } else if (filters.year) {
    const startDate = new Date(filters.year, 0, 1);
    const endDate = new Date(filters.year, 11, 31, 23, 59, 59, 999);
    filter.datetime = { $between: [startDate, endDate] };
  }

  if (filters.type) {
    filter.type = { $in: Array.isArray(filters.type) ? filters.type : [filters.type] };
  }

  const where = buildWhereClause(user_id, filter);
  const transactions = await Transactions.findAll({
    where,
    include: [
      {
        model: Persons,
        as: 'payer',
        attributes: ['first_name', 'last_name']
      }
    ],
    attributes: { exclude: [''] }, // No sensitive fields in Transactions
    order: [['datetime', 'DESC']],
    ...(transaction ? { transaction } : {} )
  });
  console.log('Fetched transactions:', JSON.stringify(transactions, null, 2));
  return transactions;
};

module.exports = getByUserIdTransactionService;
