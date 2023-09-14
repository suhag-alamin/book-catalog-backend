import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', auth(UserRole.ADMIN), UserController.getAllUsersController);
router.get(
  '/:id',
  auth(UserRole.ADMIN),
  UserController.getSingleUserController
);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(UserRole.ADMIN),
  UserController.updateUserController
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN),
  UserController.deleteUserController
);

export const UserRoutes = router;
