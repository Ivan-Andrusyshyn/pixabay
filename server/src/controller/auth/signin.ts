import { NextFunction, Request, Response } from 'express';

import HttpError from '../../utils/httpError';
import { CustomRequest } from '../../middleware/authMiddleware';

const signIn = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const customRequest = request as CustomRequest;

    const user = customRequest.user;
    const token = customRequest.token;

    response.status(200).json({
      message: 'Success!',
      access_token: token,
      user,
    });
  } catch (error) {
    next(new HttpError('Failed login', 500));
  }
};
export default signIn;
