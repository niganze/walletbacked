import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";
import nodemailer from "nodemailer";

// Constants for Eric's details
const ERIC_EMAIL = "eric@gmail.com";
const ERIC_PHONE = "0783943932";

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Create Budget
export const createBudget = async (req, res) => {
  const { amount, account, category } = req.body;

  try {
    const budget = new Budget({ amount, account, category });
    await budget.save();
    res.status(201).json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Track Budget and Notify Eric
export const trackBudget = async (req, res) => {
  const { transactionId } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId).populate("category");
    if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });

    const budgets = await Budget.find({ account: transaction.account, category: transaction.category._id });
    if (budgets.length === 0) return res.status(404).json({ success: false, message: "No budget found" });

    for (let budget of budgets) {
      budget.remainingAmount -= transaction.amount;

      if (budget.remainingAmount < 0 && !budget.notified) {
        // Send Email Notification
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: ERIC_EMAIL,
          subject: "Budget Exceeded Notification",
          text: `Hello Eric, your budget for the account "${budget.account}" has been exceeded!`,
        });

        // Mark the budget as notified
        budget.notified = true;
      }

      await budget.save();
    }

    res.status(200).json({ success: true, message: "Budgets tracked and notification sent if needed." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Budgets
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find().populate("category");
    res.status(200).json({ success: true, budgets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
