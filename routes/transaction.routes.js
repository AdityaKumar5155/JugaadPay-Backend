const express = require('express');
const router = express.Router();
const {
    createSentTransaction,
    createReceivedTransaction,
    getTransactions,
    getTransactionById
} = require('../controllers/transaction.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Create sent transaction
router.post('/sent', authMiddleware, createSentTransaction);

// Create received transaction
router.post('/received', authMiddleware, createReceivedTransaction);

// Get paginated/filterable transactions
router.get('/page/:page', authMiddleware, getTransactions);

// Get transaction by id
router.get('/:id', authMiddleware, getTransactionById);

module.exports = router;
