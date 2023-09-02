import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { exclude } from '../../../shared/utils';

const getAllFromDB = async (): Promise<Omit<User, 'password'>[]> => {
  const users = await prisma.user.findMany();
  return users.map(user => exclude(user, ['password']));
};



export const UserService = {
  getAllFromDB,
};
