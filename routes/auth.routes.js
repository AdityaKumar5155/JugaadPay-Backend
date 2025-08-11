const express = require('express');
const router = express.Router();

const { sendAuthOTPToEmail, signUp, login, sendPasswordResetOTP, resetPassword, changePassword, validateAuthToken } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to send OTP to email
router.post('/send-otp', sendAuthOTPToEmail);
// Route to sign up user
router.post('/signup', signUp);
// Route to login user
router.post('/login', login);

// Send OTP for password reset
router.post('/reset-password/send-otp', sendPasswordResetOTP);

// Reset password using OTP
router.post('/reset-password', resetPassword);

// Change password (authenticated)
router.post('/change-password', authMiddleware, changePassword);
router.get('/validate-token', authMiddleware, validateAuthToken);


module.exports = router;