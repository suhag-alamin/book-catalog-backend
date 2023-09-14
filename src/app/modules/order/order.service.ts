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
        orderedBooks: true,
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create order');
};

export const OrderService = {
  createOrder,
};
