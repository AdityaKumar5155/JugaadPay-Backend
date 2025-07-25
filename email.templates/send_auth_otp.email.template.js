const generateEmailTemplate = (otp) => {
  return `
    <html>
      <body>
        <h1>Authentication OTP</h1>
        <p>Your OTP for authentication is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 15 minutes.</p>
      </body>
    </html>
  `;
}

module.exports = generateEmailTemplate;