import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from './book.constant';
import { IBookFilters } from './book.interface';

const createBook = async (data: Book) => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filtersData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          };
        }
      }),
    });
  }

  if (minPrice) {
    andConditions.push({
      AND: [
        {
          price: {
            gte: Number(minPrice),
          },
        },
      ],
    });
  }
  if (maxPrice) {
    andConditions.push({
      AND: [
        {
          price: {
            lte: Number(maxPrice),
          },
        },
      ],
    });
  }

  if (minPrice && maxPrice) {
    andConditions.push({
      AND: [
        {
          price: {
            gte: Number(minPrice),
          },
        },
        {
          price: {
            lte: Number(maxPrice),
          },
        },
      ],
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  categoryId: string,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.book.findMany({
    where: {
      category: {
        id: categoryId,
      },
    },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
};
