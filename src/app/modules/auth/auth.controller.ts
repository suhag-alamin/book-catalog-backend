import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signupController = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Signup successfully',
    data: result,
  });
});

const loginController = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  const { refreshToken, accessToken } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  // sendResponse<ILoginResponse>(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'User logged in successfully',
  //   // data: othersData,
  //   token: accessToken,
  // });
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User signin successfully!',
    token: accessToken,
  });
});

export const AuthController = {
  signupController,
  loginController,
};
