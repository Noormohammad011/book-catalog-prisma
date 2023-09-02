import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { convertToIsoDate } from '../../../shared/utils';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const { publicationDate } = data;

  return await prisma.book.create({
    data: {
      ...data,
      publicationDate: convertToIsoDate(publicationDate),
    },
    include: {
      category: true,
    },
  });
};

const getByIdFromDB = async (id: string): Promise<Book | null> => {
  return await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  return await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
};

const deleteFromDB = async (id: string): Promise<Book> => {
  return await prisma.book.delete({
    where: {
      id,
    },
  });
};

const getByCategoryIdFromDB = async (
  CategoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: {
      categoryId: CategoryId,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: {
      categoryId: CategoryId,
    },
  });
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

export const BookService = {
  insertIntoDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getByCategoryIdFromDB,
};
