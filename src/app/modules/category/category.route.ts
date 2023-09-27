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
  auth(UserRole.admin),
  CategoryController.createCategoryController
);
router.get(
  '/',
  auth(UserRole.admin),
  CategoryController.getAllCategoriesController
);
router.get(
  '/:id',
  auth(UserRole.admin),
  CategoryController.getSingleCategoryController
);
router.patch(
  '/:id',
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  auth(UserRole.admin),
  CategoryController.updateCategoryController
);
router.delete(
  '/:id',
  auth(UserRole.admin),
  CategoryController.deleteCategoryController
);

export const CategoryRoutes = router;
