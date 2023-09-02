import express from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import { UserProfileRoute } from '../modules/profile/profile.routes';
import { UserRoute } from '../modules/users/users.routes';
import { CategoryRoute } from '../modules/category/category.routes';
import { BookRoute } from '../modules/books/books.routes';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/profile',
    route: UserProfileRoute,
  },
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/books',
    route: BookRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
