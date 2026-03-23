import express from 'express';
import {
  getAllPlans,
  generatePlan,
  customizePlan,
  analyzeRoom
} from '../controllers/planController.js';

const router = express.Router();

// Get all generated plans
router.get('/', getAllPlans);

// Analyze room from image/data
router.post('/analyze', analyzeRoom);

// Generate complete interior plan
router.post('/generate', generatePlan);

// Customize existing plan
router.put('/:planId/customize', customizePlan);

export default router;
