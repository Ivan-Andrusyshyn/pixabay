import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userService from '../services/user';
import User from '../controller/user/user.interface';
import { CustomRequest } from './authMiddleware';

dotenv.config();

const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email }: User = req.body;
  const request = req as CustomRequest;

  try {
    const result = await userService.getUserByEmail(email);

    if (result && result.email && result.name && result.id) {
      const id = result.id;

      const token = jwt.sign(
        { name, email, id },
        process.env.JWT_KEY as string,
        {
          expiresIn: '45m',
        }
      );
      request.token = token;
      request.user = result;
    }
  } catch (error) {
    res.status(403).json({ message: 'User is not exist!' });
  } finally {
    next();
  }
};

export default jwtMiddleware;
