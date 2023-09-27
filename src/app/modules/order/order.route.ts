import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
  '/create-order',
  auth(UserRole.customer),
  OrderController.createOrderController
);

router.get(
  '/',
  auth(UserRole.admin, UserRole.customer),
  OrderController.getAllOrdersController
);
router.get(
  '/:orderId',
  auth(UserRole.admin, UserRole.customer),
  OrderController.getSingleOrderController
);

export const OrderRoutes = router;
