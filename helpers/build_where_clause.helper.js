const { Op } = require("sequelize");

const buildWhereClause = (user_id, filters = {}) => {
  const where = { user_id };
  for (const key in filters) {
    const value = filters[key];
    if (typeof value === 'object' && value !== null) {
      // Map custom operators to Sequelize Op
      const opMap = {
        $like: Op.like,
        $notLike: Op.notLike,
        $iLike: Op.iLike,
        $notILike: Op.notILike,
        $gte: Op.gte,
        $lte: Op.lte,
        $gt: Op.gt,
        $lt: Op.lt,
        $ne: Op.ne,
        $in: Op.in,
        $notIn: Op.notIn,
        $between: Op.between,
        $notBetween: Op.notBetween,
        $or: Op.or,
        $and: Op.and
      };
      where[key] = {};
      for (const op in value) {
        if (opMap[op]) {
          where[key][opMap[op]] = value[op];
        }
      }
    } else {
      where[key] = value;
    }
  }
  return where;
};

module.exports = buildWhereClause;