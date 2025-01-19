import express from 'express';
import { generateTransactionReport } from '../controllers/reportController.js';

const router = express.Router();

router.post('/generate', generateTransactionReport);

export default router;
