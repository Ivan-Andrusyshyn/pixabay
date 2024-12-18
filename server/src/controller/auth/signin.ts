import { NextFunction, Request, Response } from "express";

import HttpError from "../../utils/httpError";
import { CustomRequest } from "../../middleware/authMiddleware";

const signIn = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const customRequest = request as CustomRequest;
    if (!customRequest.token) {
      throw new HttpError("Authentication token is missing", 401);
    }

    response.status(200).json({
      message: "Success!",
      access_token: customRequest.token,
    });
  } catch (error) {
    next(new HttpError("Failed login", 500));
  }
};
export default signIn;
