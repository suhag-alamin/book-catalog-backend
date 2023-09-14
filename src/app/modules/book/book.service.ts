import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (data: Book) => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

export const BookService = {
  createBook,
};
