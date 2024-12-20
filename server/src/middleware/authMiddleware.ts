import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LoginUser } from '../controller/user/user.interface';

dotenv.config();

export interface CustomRequest extends Request {
  user: LoginUser | JwtPayload;
  token: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res
        .status(401)
        .json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader?.replace('Bearer ', '') as string;
    console.log(token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as LoginUser;
    if (!decoded || !decoded.id || !decoded.email) {
      res.status(401).json({ message: 'Invalid token payload' });
    }
    (req as CustomRequest).user = decoded;
    (req as CustomRequest).token = token;

    next();
  } catch (err: any) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
    } else if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token has expired' });
    }

    res.status(500).json({ message: err.message });
  }
};

export default authMiddleware;
