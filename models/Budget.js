import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true }, 
    remainingAmount: { type: Number, default: 0 },
    account: { type: String, required: true }, // e.g., 'bank', 'mobile money', 'cash'
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Optional: Specific category
    notified: { type: Boolean, default: false }, // Whether notification was sent
  },
  { timestamps: true }
);

budgetSchema.pre("save", function (next) {
  if (!this.remainingAmount) {
    this.remainingAmount = this.amount;
  }
  next();
});

export default mongoose.model("Budget", budgetSchema);
