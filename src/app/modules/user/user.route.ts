import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', auth(UserRole.ADMIN), UserController.getAllUsersController);

export const UserRoutes = router;
