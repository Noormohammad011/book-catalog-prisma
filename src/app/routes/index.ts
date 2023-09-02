import express from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import { UserProfileRoute } from '../modules/profile/profile.routes';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/profile',
    route: UserProfileRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
