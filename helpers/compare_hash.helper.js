const bcrypt = require('bcryptjs');

const compareHash = async (string, hash) => {
  return await bcrypt.compare(string, hash);
};

module.exports = compareHash;
