import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    account: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
