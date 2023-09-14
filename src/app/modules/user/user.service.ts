import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { excludePassword } from '../../../shared/utils';

const getAllUsers = async () => {
  const result = await prisma.user.findMany();

  const newResult = [];

  for (let i = 0; i < result.length; i++) {
    const user = result[i];
    const newUser = excludePassword(user, ['password']);
    newResult.push(newUser);
  }

  return newResult;
};
const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (result) {
    const newResult = excludePassword(result, ['password']);
    return newResult;
  }
  return null;
};

const updateUser = async (id: string, data: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  const newResult = excludePassword(result, ['password']);
  return newResult;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
};
