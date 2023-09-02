import { User } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import { exclude } from '../../../shared/utils';

const getByIdFromDB = async (
  userId: string
): Promise<Omit<User, 'password'> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return exclude(user, ['password']);
};

export const UserProfileService = {
  getByIdFromDB,
};
