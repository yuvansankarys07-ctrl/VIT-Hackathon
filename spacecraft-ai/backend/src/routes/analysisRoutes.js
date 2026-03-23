import express from 'express';
import {
  getAnalysisMetrics,
  calculateBudgetAnalysis,
  generateSpaceReport
} from '../controllers/analysisController.js';

const router = express.Router();

router.get('/metrics/:planId', getAnalysisMetrics);
router.post('/budget', calculateBudgetAnalysis);
router.post('/space-report', generateSpaceReport);

export default router;
