import { Book, Prisma } from '@prisma/client';
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

export const BookService = {
  insertIntoDB,
};
