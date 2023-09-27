import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  auth(UserRole.admin),
  BookController.createBookController
);

router.get('/', BookController.getAllBooksController);
router.get(
  '/:categoryId/category',
  BookController.getBooksByCategoryIdController
);
router.get('/:id', BookController.getSingleBookController);
router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  auth(UserRole.admin),
  BookController.updateBookController
);
router.delete(
  '/:id',
  auth(UserRole.admin),
  BookController.deleteBookController
);

export const BookRoutes = router;
