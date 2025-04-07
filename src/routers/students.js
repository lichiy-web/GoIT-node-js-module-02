import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middleware/isValidId.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { authenticate } from '../middleware/authenticate.js';

const router = new Router();
router.use(authenticate);
router.get('/', ctrlWrapper(getStudentsController));
router.get('/:studentId', isValidId, ctrlWrapper(getStudentByIdController));
router.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
router.delete('/:studentId', isValidId, ctrlWrapper(deleteStudentController));
router.put(
  '/:studentId',
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);
export default router;
