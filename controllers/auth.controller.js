const compareHash = require("../helpers/compare_hash.helper");
const createHash = require("../helpers/create_hash.helper");
const createJwt = require("../helpers/create_jwt.helper");
const loginAuthSchema = require("../schemas/auth.schemas/login.auth.schema");
const signupAuthSchema = require("../schemas/auth.schemas/signup.auth.schema");
const createAuthOtpService = require("../services/otp.services/create_auth.otp.service");
const verifyAuthOtpService = require("../services/otp.services/verify_auth.otp.service");
const createUserService = require("../services/user.services/create.user.service");
const getByEmailUserService = require("../services/user.services/get_by_email.user.service");
const createPasswordResetOtpService = require('../services/otp.services/create_password_reset.otp.service');
const resetPasswordService = require('../services/user.services/reset_password.user.service');
const changePasswordService = require('../services/user.services/change_password.user.service');

const sendAuthOTPToEmail = async (req, res) => {
    try{
        // Logic to send OTP to email
        const body = req.body;
        if (!body){
            return res.status(400).json({ message: 'Request body is required' });
        }
        const { email } = body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        await createAuthOtpService(email);
        res.status(200).json({ success:true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const signUp = async (req, res) => {
    try {
        const result = signupAuthSchema.safeParse(req.body);
        if (!result.success) {
            const errors = JSON.parse(result.error);
            return res.status(400).json({ message: errors?.[0]?.message || 'Invalid input', errors: errors || [] });
        }
        const data = result.data;
        const { email, otp } = data;
        const existingUser = await getByEmailUserService(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        await verifyAuthOtpService(email, otp);
        data.password = await createHash(data.password);
        const user = await createUserService(data);
        const userId = user.id;
        const token = createJwt({ id: userId });
        res.status(200).json({ success:true,  message: 'User signed up successfully', data: token });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const login = async (req, res) => {
    try{
        const result = loginAuthSchema.safeParse(req.body);
        if (!result.success) {
            const errors = JSON.parse(result.error);
            return res.status(400).json({ message: errors?.[0]?.message || 'Invalid input', errors: errors || [] });
        }
        const data = result.data;
        const { email, password } = data;
        const user = await getByEmailUserService(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!(await compareHash(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = createJwt({ id: user.id });
        res.status(200).json({ success:true, message: 'User logged in successfully', data: token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Send OTP for password reset
const sendPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ message: 'Email is required' });
    await createPasswordResetOtpService(email);
    return res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// Reset password using OTP
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body || {};
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP and newPassword are required' });
    }
    await resetPasswordService(email, otp, newPassword);
    return res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// Change password using old password (authenticated)
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body || {};
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'oldPassword and newPassword are required' });
    }
    await changePasswordService(userId, oldPassword, newPassword);
    return res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

const validateAuthToken = (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Token is valid',
        data: user
    })
}

module.exports = {
    sendAuthOTPToEmail,
    signUp,
    login,
    sendPasswordResetOTP,
    resetPassword,
    changePassword,
    validateAuthToken
}