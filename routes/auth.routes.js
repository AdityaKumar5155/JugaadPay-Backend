const express = require('express');
const router = express.Router();

const { sendAuthOTPToEmail, signUp, login } = require('../controllers/auth.controller');

// Route to send OTP to email
router.post('/send-otp', sendAuthOTPToEmail);
// Route to sign up user
router.post('/signup', signUp);
// Route to login user
router.post('/login', login);

module.exports = router;