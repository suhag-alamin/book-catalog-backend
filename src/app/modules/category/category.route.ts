import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  validateRequest(CategoryValidation.createCategoryZodSchema),
  auth(UserRole.ADMIN),
  CategoryController.createCategoryController
);
router.get(
  '/',
  auth(UserRole.ADMIN),
  CategoryController.getAllCategoriesController
);
router.get(
  '/:id',
  auth(UserRole.ADMIN),
  CategoryController.getSingleCategoryController
);
router.patch(
  '/:id',
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  auth(UserRole.ADMIN),
  CategoryController.updateCategoryController
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN),
  CategoryController.deleteCategoryController
);

export const CategoryRoutes = router;
