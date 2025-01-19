import Transaction from '../models/Transaction.js';
import { generateReport } from '../utils/generateReport.js';

export const generateTransactionReport = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const transactions = await Transaction.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate('category');
    const report = generateReport(transactions);
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: 'Error generating report' });
  }
};
