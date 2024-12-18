import { Request, Response } from 'express';

import HttpError from '../../utils/httpError';
import { CustomRequest } from '../../middleware/authMiddleware';

const signUp = async (request: Request, response: Response) => {
  try {
    const customRequest = request as CustomRequest;
    if (!customRequest.token) {
      throw new HttpError('Authentication token is missing', 401);
    }

    response.status(200).json({
      message: 'Success!',
      access_token: customRequest.token,
    });
  } catch (error) {
    throw new HttpError('Failed to create user', 500);
  }
};
export default signUp;
