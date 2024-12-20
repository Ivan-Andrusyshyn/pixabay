import { Request, Response } from 'express';

import userService from '../../services/user';
import HttpError from '../../utils/httpError';

const createUser = async (request: Request, response: Response) => {
  const { name, email, password, interest } = request.body;
  try {
    const createdUser = await userService.createUser({
      name,
      email,
      password,
      interest,
    });
    response.status(201).json({
      message: 'Success!',
      createdUser,
    });
  } catch (error) {
    throw new HttpError('Failed to create user', 500);
  }
};

export default createUser;
