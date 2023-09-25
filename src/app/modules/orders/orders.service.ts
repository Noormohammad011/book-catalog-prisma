import { Order, OrderedBook } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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
  if (!order) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order not created');
  }
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

const getAllFromDBCustomer = async (userId: string): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

const getByIdFromDB = async (
  orderId: string,
  role: string,
  userId: string
): Promise<Order[]> => {
  if (role === 'admin') {
    const result = await prisma.order.findMany({
      where: {
        id: orderId,
      },
      include: {
        orderedBooks: true,
      },
    });
    return result;
  } else {
    const result = await prisma.order.findMany({
      where: {
        id: orderId,
        userId: userId,
      },
      include: {
        orderedBooks: true,
      },
    });
    return result;
  }
};

export const OrderService = {
  getAllFromDB,
  getByIdFromDB,
  getAllFromDBCustomer,
  insertIntoDB,
};
