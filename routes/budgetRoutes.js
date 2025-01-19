import express from "express";
import { createBudget, trackBudget, getBudgets } from "../controllers/budgetController.js";

const router = express.Router();

// Create a new budget
router.post("/", createBudget);

// Track budget when a transaction is made
router.post("/track", trackBudget);

// Get all budgets
router.get("/", getBudgets);

export default router;
