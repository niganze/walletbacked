import express from 'express';
import { createCategory, getAllCategories } from '../controllers/categoryController.js';

const router = express.Router();

// Add a new category
router.post('/', createCategory);

// Get all categories
router.get('/', getAllCategories);

export default router;

