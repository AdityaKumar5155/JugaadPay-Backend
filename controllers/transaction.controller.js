const getTransactionByIdService = require('../services/transaction.services/get_by_id.transaction.service');
const createSentTransactionService = require('../services/transaction.services/sent_create.transaction.service');
const createReceivedTransactionService = require('../services/transaction.services/received_create.transaction.service');
const getByUserIdTransactionService = require('../services/transaction.services/get_by_user_id.transaction.service');
const sentCreateTransactionSchema = require('../schemas/transaction.schemas/sent_create.transaction.schema');
const receivedCreateTransactionSchema = require('../schemas/transaction.schemas/received_create.transaction.schema');
const getNumberOfTransactionsByUserIdService = require('../services/transaction.services/get_number_of_transactions_by_user_id.transaction.service');
// Get transactions for a user with filters and pagination (with total count and pages)
const getTransactions = async (req, res) => {
  try {
    const user_id = req.user.id;
    const filters = req.query || {};
    const transactions = await getByUserIdTransactionService(user_id, null, filters);

    // Get total count for pagination
    const totalCount = await getNumberOfTransactionsByUserIdService(user_id, null, filters);
    const pages = Math.ceil(totalCount / 50); // Assuming 50 items per page

    return res.status(200).json({
      success: true,
      data: {
        transactions,
        totalCount,
        pages
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createSentTransaction = async (req, res) => {
  const parseResult = sentCreateTransactionSchema.safeParse(req.body);
  if (!parseResult.success) {
    const errors = JSON.parse(parseResult.error);
    return res.status(400).json({
        message: errors?.[0]?.message || 'Invalid input',
        errors: errors || []
    });
  }
  try {
    const user_id = req.user.id;
    const transaction = await createSentTransactionService(parseResult.data, user_id);
    return res.status(200).json({
        success: true,
        message: 'Transaction created successfully',
        data: transaction
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createReceivedTransaction = async (req, res) => {
  const parseResult = receivedCreateTransactionSchema.safeParse(req.body);
  if (!parseResult.success) {
    const errors = JSON.parse(parseResult.error);
    return res.status(400).json({
        message: errors?.[0]?.message || 'Invalid input',
        errors: errors || []
    });
  }
  try {
    const user_id = req.user.id;
    const transaction = await createReceivedTransactionService(parseResult.data, user_id);
    return res.status(200).json({
        success: true,
        message: 'Transaction created successfully',
        data: transaction
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const user_id = req.user.id;
    const transactionId = req.params.id;
    const transaction = await getTransactionByIdService(transactionId, user_id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    return res.status(200).json({ success: true, data: transaction });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


module.exports = { createSentTransaction, createReceivedTransaction, getTransactions, getTransactionById };
