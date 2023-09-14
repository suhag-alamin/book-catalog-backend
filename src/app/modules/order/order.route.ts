import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
  '/create-order',
  auth(UserRole.CUSTOMER),
  OrderController.createOrderController
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  OrderController.getAllOrdersController
);
router.get(
  '/:orderId',
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  OrderController.getSingleOrderController
);

export const OrderRoutes = router;
