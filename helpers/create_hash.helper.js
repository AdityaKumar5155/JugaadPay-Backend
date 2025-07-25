const bcrypt = require('bcryptjs');
const saltRounds = 10;

const createHash = async (string) => {
  return await bcrypt.hash(string, saltRounds);
};

module.exports = createHash;
