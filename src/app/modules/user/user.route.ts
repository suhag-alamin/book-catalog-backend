import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', auth(UserRole.admin), UserController.getAllUsersController);
router.get(
  '/:id',
  auth(UserRole.admin),
  UserController.getSingleUserController
);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(UserRole.admin),
  UserController.updateUserController
);
router.delete(
  '/:id',
  auth(UserRole.admin),
  UserController.deleteUserController
);

export const UserRoutes = router;
