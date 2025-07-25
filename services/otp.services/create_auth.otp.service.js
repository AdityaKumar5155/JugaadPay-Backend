const { OTPs, sequelize } = require('../../models');
const createOtp = require('../../helpers/create_otp.helper');
const sendAuthOTPToEmailService = require('../email.services/send_auth_otp.email.service');

const createAuthOtpService = async (email) => {
  const transaction = await sequelize.transaction();
  try {
    const otp = createOtp();
    // 15 min expiry in UTC
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    // Ensure UTC
    expiresAt.setUTCMinutes(expiresAt.getUTCMinutes());
    await OTPs.destroy({ where: { email }, transaction });
    await OTPs.create({ email, otp, expires_at: expiresAt }, { transaction });
    await sendAuthOTPToEmailService(email, otp);
    await transaction.commit();
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error('Error creating OTP:', err);
    throw new Error('Failed to create OTP');
  }
};

module.exports = createAuthOtpService;
