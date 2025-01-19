import Category from '../models/Category.js';

// Create a new category
export const createCategory = async (req, res) => {
  const { name, parentCategory } = req.body;

  try {
    const category = new Category({ name, parentCategory });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error adding category', error: err.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parentCategory');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};
