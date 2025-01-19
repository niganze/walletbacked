import Budget from '../models/Budget.js';

// Set or update a budget
export const setBudget = async (req, res) => {
  const { amount, account, category, user } = req.body;

  try {
    const budget = new Budget({ amount, account, category, user });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Error setting budget', error: err.message });
  }
};

// Get the budget for a user
export const getBudget = async (req, res) => {
  const { userId } = req.query;

  try {
    const budget = await Budget.find({ user: userId }).populate('category');
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching budget', error: err.message });
  }
};
