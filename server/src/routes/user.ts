import { Router } from 'express';

import { getUserById, getUsers } from '../controller/user/get-user';
import createUser from '../controller/user/create-user';
import updateUser from '../controller/user/update-user';
import deleteUser from '../controller/user/delete-user';
import userValidationRules from '../validation/user';
import validateFilter from '../middleware/validateFilter';

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get(
  '/users/:id',
  userValidationRules('id'),
  validateFilter,
  getUserById
);
userRouter.post(
  '/users',
  userValidationRules('name', 'email'),
  validateFilter,
  createUser
);
userRouter.put(
  '/users/:id',
  userValidationRules('name', 'email', 'id'),
  validateFilter,
  updateUser
);
userRouter.delete(
  '/users/:id',
  userValidationRules('id'),
  validateFilter,
  deleteUser
);

export default userRouter;
