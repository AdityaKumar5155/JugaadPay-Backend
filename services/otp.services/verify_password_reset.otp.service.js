const verifyAuthOtpService = require('./verify_auth.otp.service');

// Wrapper to verify OTP for password reset
const verifyPasswordResetOtpService = async (email, otp) => {
  if (!email || !otp) throw new Error('Email and OTP are required');
  return await verifyAuthOtpService(email, otp);
};

module.exports = verifyPasswordResetOtpService;
