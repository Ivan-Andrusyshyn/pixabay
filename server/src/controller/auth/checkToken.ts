import { NextFunction, Request, Response } from 'express';

import HttpError from '../../utils/httpError';
import { CustomRequest } from '../../middleware/authMiddleware';

const checkToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const customRequest = request as CustomRequest;

    const user = customRequest.user;

    if (!user) {
      throw new HttpError('Authentication error', 401);
    }

    response.status(200).json({
      message: 'Success check authentication!',
      user,
    });
  } catch (error) {
    throw new HttpError('Failed to create user', 500);
  }
};
export default checkToken;
