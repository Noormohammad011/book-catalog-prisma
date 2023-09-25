import { z } from 'zod';

const OrderedBookSchema = z.object({
  bookId: z.string(),
  quantity: z.number().refine(val => val > 0, {
    message: 'Quantity must be greater than 0',
  }),
});

const create = z.object({
  body: z.object({
    orderedBooks: z.array(OrderedBookSchema),
  }),
});

export const OrderValidations = {
  create,
};
