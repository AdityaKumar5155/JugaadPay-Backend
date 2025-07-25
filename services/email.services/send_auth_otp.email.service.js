 const sendEmail = require('../../utils/email');
 const getOtpEmailTemplate = require('../../email.templates/send_auth_otp.email.template');

const sendAuthOtpEmailService = async (email, otp) => {
  try {
    const subject = 'Your Authentication OTP';
    const html = getOtpEmailTemplate(otp);
    // Send email
    await sendEmail(email, subject, html);
  } catch (err) {
    console.error('Error sending OTP email:', err);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = sendAuthOtpEmailService;
