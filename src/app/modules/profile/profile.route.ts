import express from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.get(
  '/',
  auth(UserRole.admin, UserRole.customer),
  ProfileController.getProfileController
);

export const ProfileRoutes = router;
