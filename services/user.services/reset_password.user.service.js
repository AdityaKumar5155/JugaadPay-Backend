const getByEmailUserService = require('./get_by_email.user.service');
const createHash = require('../../helpers/create_hash.helper');
const verifyPasswordResetOtpService = require('../otp.services/verify_password_reset.otp.service');

// Reset password using email + OTP
const resetPasswordService = async (email, otp, newPassword) => {
  if (!email || !otp || !newPassword) {
    throw new Error('Email, OTP and newPassword are required');
  }
  await verifyPasswordResetOtpService(email, otp);
  const user = await getByEmailUserService(email);
  if (!user) throw new Error('User not found');
  const hashed = await createHash(newPassword);
  await user.update({ password: hashed });
  return true;
};

module.exports = resetPasswordService;
