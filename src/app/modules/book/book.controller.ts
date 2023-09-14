import { Book } from '@prisma/client';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './book.constant';
import { paginationFields } from '../../../constants/pagination';

const createBookController = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully!',
    data: result,
  });
});

const getAllBooksController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookService.getAllBooks(filters, paginationOptions);

    sendResponse<Book[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getBooksByCategoryIdController = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookService.getBooksByCategoryId(
      req.params.categoryId,
      paginationOptions
    );

    sendResponse<Book[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleBookController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.getSingleBook(req.params.id);

    sendResponse<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book retrieved successfully!',
      data: result,
    });
  }
);
const updateBookController = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(req.params.id, req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully!',
    data: result,
  });
});
const deleteBookController = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBook(req.params.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!',
    data: result,
  });
});

export const BookController = {
  createBookController,
  getAllBooksController,
  getBooksByCategoryIdController,
  getSingleBookController,
  updateBookController,
  deleteBookController,
};
