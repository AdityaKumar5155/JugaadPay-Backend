const express = require('express');
const router = express.Router();
const { getTransactionPayees } = require('../controllers/transaction_payees.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Get all payees for a transaction (for the authenticated user)
router.get('/:transactionId', authMiddleware, getTransactionPayees);

module.exports = router;
