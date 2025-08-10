const createAuthOtpService = require('./create_auth.otp.service');

// Wrapper to create/send OTP for password reset via email
const createPasswordResetOtpService = async (email) => {
  if (!email) throw new Error('Email is required');
  return await createAuthOtpService(email);
};

module.exports = createPasswordResetOtpService;
