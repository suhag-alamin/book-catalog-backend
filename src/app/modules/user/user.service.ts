import prisma from '../../../shared/prisma';

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

export const UserService = {
  getAllUsers,
};
