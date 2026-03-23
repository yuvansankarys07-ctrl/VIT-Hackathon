import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:projectId', getProjectById);
router.post('/', createProject);
router.put('/:projectId', updateProject);
router.delete('/:projectId', deleteProject);

export default router;
