import express from 'express';
import {
  getAllFurniture,
  getFurnitureByCategory,
  getFurnitureById,
  searchFurniture
} from '../controllers/furnitureController.js';

const router = express.Router();

router.get('/', getAllFurniture);
router.get('/search', searchFurniture);
router.get('/category/:category', getFurnitureByCategory);
router.get('/:furnitureId', getFurnitureById);

export default router;
