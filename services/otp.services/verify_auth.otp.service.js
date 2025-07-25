const { OTPs, sequelize } = require('../../models');

const verifyAuthOtpService = async (email, otp) => {
  const transaction = await sequelize.transaction();
  try {
    const otpRecord = await OTPs.findOne({ where: { email, otp }, transaction });
    if (!otpRecord) {
      await transaction.rollback();
      throw new Error('Invalid OTP');
    }
    if (new Date() > otpRecord.expires_at) {
      await transaction.rollback();
      throw new Error('OTP expired');
    }
    // OTP is valid, delete it (single-use)
    await OTPs.destroy({ where: { id: otpRecord.id }, transaction });
    await transaction.commit();
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
    }
    throw new Error('Failed to verify OTP');
  }
};

module.exports = verifyAuthOtpService;
