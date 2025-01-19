import express from 'express';
import { setBudget, getBudget } from '../controllers/budgetController.js';

const router = express.Router();

// Set or update a budget
router.post('/', setBudget);

// Get budget for a user
router.get('/', getBudget);

export default router;
