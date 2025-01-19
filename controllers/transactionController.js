import Transaction from '../models/Transaction.js';

// Create a new transaction
export const createTransaction = async (req, res) => {
  const { amount, type, account, category } = req.body;

  try {
    const transaction = new Transaction({ amount, type, account, category });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error adding transaction', error: err.message });
  }
};

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('category');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
};

// Get transactions by date range
export const getTransactionsByDate = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const transactions = await Transaction.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate('category');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error generating report', error: err.message });
  }
};
