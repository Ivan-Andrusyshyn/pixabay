import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import HttpError from '../../utils/httpError';
import userService from '../../services/user';

const signUp = async (request: Request, response: Response) => {
  try {
    const { name, email, password, interest } = request.body;

    const token = jwt.sign(
      { name, email, interest },
      process.env.JWT_KEY as string,
      {
        expiresIn: '45m',
      }
    );
    const createdUser = await userService.createUser({
      name,
      email,
      password,
      interest,
    });
    console.log(createdUser);

    response.status(200).json({
      message: 'Success!',
      access_token: token,
      user: { name, email, interest },
    });
  } catch (error) {
    throw new HttpError('Failed to create user', 500);
  }
};
export default signUp;
