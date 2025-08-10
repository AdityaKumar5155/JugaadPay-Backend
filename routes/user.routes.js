const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateUser
} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Get user profile
router.get('/profile', authMiddleware, getProfile);

// Update user profile
router.put('/profile', authMiddleware, updateUser);

module.exports = router;
