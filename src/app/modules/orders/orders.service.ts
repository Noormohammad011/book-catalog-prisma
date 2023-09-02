import { Order, OrderedBook } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  userId: string,
  orderedBooks: OrderedBook
): Promise<Order> => {
  const order = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks: {
        create: orderedBooks,
      },
    },
    include: {
      orderedBooks: true,
    },
  });
  return order;
};

const getAllFromDB = async (): Promise<Order[]> => {
  return await prisma.order.findMany({
    include: {
      orderedBooks: true,
      user: {
        select: {
          name: true,
          email: true,
          id: true,
          role: true,
        },
      },
    },
  });
};

const getAllFromDBCustomer = async (userId: string): Promise<Order | null> => {
  return await prisma.order.findFirst({
    where: {
      userId: userId,
    },
    include: {
      orderedBooks: true,
    },
  });
};

const getByIdFromDB = async (
  orderId: string,
  role: string,
  userId: string
): Promise<Order | null> => {
  if (role === 'admin') {
    return await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        orderedBooks: true,
      },
    });
  } else {
    return await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: userId,
      },
      include: {
        orderedBooks: true,
      },
    });
  }
};

export const OrderService = {
  getAllFromDB,
  getByIdFromDB,
  getAllFromDBCustomer,
  insertIntoDB,
};
