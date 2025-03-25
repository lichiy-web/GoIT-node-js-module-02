import { Router } from 'express';
import {
  getStudentByIdController,
  getStudentsController,
} from '../controllers/students.js';

const router = new Router();
router.get('/students', getStudentsController);
router.get('/students/:studentId', getStudentByIdController);

export default router;
