import express from 'express';
import { getStyles, getStyleById } from '../controllers/styleController.js';

const router = express.Router();

router.get('/', getStyles);
router.get('/:styleId', getStyleById);

export default router;
