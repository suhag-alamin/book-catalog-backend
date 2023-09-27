import { Order, UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICreateOrder } from './order.interface';

const createOrder = async (data: ICreateOrder, user: JwtPayload | null) => {
  const newOrder = await prisma.$transaction(async transactionClient => {
    // create the initial order
    const initialOrder = await transactionClient.order.create({
      data: {
        userId: user?.userId,
      },
    });

    // create ordered books and associate them with the order

    const orderedBooks = await Promise.all(
      data.orderedBooks.map(async order => {
        const newOrderedBook = await transactionClient.orderedBook.create({
          data: {
            quantity: order.quantity,
            bookId: order.bookId,
            orderId: initialOrder.id,
          },
        });
        return newOrderedBook;
      })
    );

    // update the order with the associated orderedBooks
    const updatedOrder = await transactionClient.order.update({
      where: {
        id: initialOrder.id,
      },
      data: {
        orderedBooks: {
          connect: orderedBooks.map(book => ({
            id: book.id,
          })),
        },
      },
    });

    return updatedOrder;
  });

  if (newOrder) {
    const responseData = await prisma.order.findUnique({
      where: {
        id: newOrder?.id,
      },
      include: {
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create order');
};

const getAllOrders = async (user: JwtPayload | null): Promise<Order[]> => {
  console.log(user);

  if (user?.role === UserRole.customer) {
    const result = await prisma.order.findMany({
      where: {
        userId: user?.userId,
      },
      include: {
        orderedBooks: true,
      },
    });
    return result;
  }

  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });
  return result;
};
const getSingleOrder = async (
  orderId: string,
  user: JwtPayload | null
): Promise<Order | null> => {
  console.log(user);

  if (user?.role === UserRole.customer) {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: user?.userId,
      },
      include: {
        orderedBooks: true,
      },
    });
    return result;
  }

  const result = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
