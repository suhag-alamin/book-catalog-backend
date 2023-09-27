import { User, UserRole } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const getProfile = async (user: JwtPayload | null): Promise<User | null> => {
  console.log(user);

  if (user?.role === UserRole.customer) {
    const result = await prisma.user.findUnique({
      where: {
        id: user?.userId,
      },
    });
    return result;
  }

  const result = await prisma.user.findUnique({
    where: {
      id: user?.userId,
    },
  });
  return result;
};

export const ProfileService = {
  getProfile,
};
