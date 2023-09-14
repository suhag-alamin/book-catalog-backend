import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully!',
      data: result,
    });
  }
);

export const UserController = {
  getAllUsersController,
};
