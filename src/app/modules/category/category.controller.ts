import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully!',
      data: result,
    });
  }
);
const getAllCategoriesController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Categories retrieved successfully!',
      data: result,
    });
  }
);
const getSingleCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getSingleCategory(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category retrieved successfully!',
      data: result,
    });
  }
);

const updateCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.updateCategory(
      req.params.id,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category updated successfully!',
      data: result,
    });
  }
);

const deleteCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.deleteCategory(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully!',
      data: result,
    });
  }
);

export const CategoryController = {
  createCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
