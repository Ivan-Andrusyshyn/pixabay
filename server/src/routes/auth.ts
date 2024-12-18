import { Router } from 'express';

import signUp from '../controller/auth/signup';
import signIn from '../controller/auth/signin';
import userValidationRules from '../validation/user';
import jwtMiddleware from '../middleware/jwt-token';
import checkToken from '../controller/auth/checkToken';
import authMiddleware from '../middleware/authMiddleware';
import validateFilter from '../middleware/validateFilter';

const authRoutes = Router();

authRoutes.post(
  '/signup',
  userValidationRules('name', 'email'),
  validateFilter,
  signUp
);

authRoutes.post(
  '/signin',
  userValidationRules('name', 'email'),
  validateFilter,
  jwtMiddleware,
  signIn
);

authRoutes.get('/check-token', authMiddleware, checkToken);

export default authRoutes;
