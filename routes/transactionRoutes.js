import express from 'express';
import { createTransaction, getAllTransactions, getTransactionsByDate } from '../controllers/transactionController.js';

const router = express.Router();

// Add a new transaction
router.post('/', createTransaction);

// Get all transactions
router.get('/', getAllTransactions);

// Get transactions by date range
router.get('/report', getTransactionsByDate);

export default router;
