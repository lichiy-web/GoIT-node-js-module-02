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
import { upload } from '../middleware/multer.js';
import { checkRoles } from '../middleware/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = new Router();
router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));
router.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getStudentByIdController),
);
router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
router.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);
router.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  upload.single('photo'),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);
export default router;
