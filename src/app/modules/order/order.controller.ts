import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Order } from '@prisma/client';

const createOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await OrderService.createOrder(req.body, user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  }
);

const getAllOrdersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrders();

    sendResponse<Order[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  }
);

export const OrderController = {
  createOrderController,
  getAllOrdersController,
};
