const getTransactionPayeesByTransactionIdService = require('../services/transaction_payees.services/get_by_transaction_id.transaction_payees.service');

// Get all payees for a transaction (for the authenticated user)
const getTransactionPayees = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionId = req.params.transactionId;
    const payees = await getTransactionPayeesByTransactionIdService(transactionId, userId);
    res.status(200).json({ success: true, data: payees });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching payees.' });
  }
};

module.exports = { getTransactionPayees };
