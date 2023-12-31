import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './users.controller';
import { UserValidations } from './users.validations';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);
router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.ADMIN), UserController.getByIdFromDB)
  .patch(
    validateRequest(UserValidations.update),
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.updateIntoDB
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), UserController.deleteFromDB);

export const UserRoute = router;
