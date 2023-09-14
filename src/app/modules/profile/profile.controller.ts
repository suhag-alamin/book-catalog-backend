import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfileController = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProfileService.getProfile(user);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfileController,
};
