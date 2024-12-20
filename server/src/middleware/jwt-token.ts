import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userService from '../services/user';
import { CustomRequest } from './authMiddleware';
import HttpError from '../utils/httpError';

dotenv.config();

const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const request = req as CustomRequest;

  try {
    const userEmail = req.body.email;

    if (!userEmail) {
      throw new HttpError('Email is required', 400);
    }

    const result = await userService.getUserByEmail(userEmail);

    if (!result) {
      throw new HttpError('User does not exist', 401);
    }
    const { _id, name, email, interest } = result;

    if (!_id || !name || !email) {
      throw new HttpError('Invalid user data', 500);
    }

    const userData = {
      id: _id.toString(),
      name,
      email,
      interest,
    };

    const jwtKey = process.env.JWT_KEY;
    if (!jwtKey) {
      throw new HttpError('JWT key is not configured', 500);
    }

    const token = jwt.sign(userData, jwtKey, {
      expiresIn: '45m',
    });

    request.token = token;
    request.user = userData;

    next();
  } catch (error) {
    console.error('Middleware error:', error);

    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message }); // Добавлен return
    }

    return res.status(500).json({ message: 'Internal server error' }); // Добавлен return
  }
};

export default jwtMiddleware;
