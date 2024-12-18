import { NextFunction, Request, Response } from "express";

import userService from "../../services/user";
import HttpError from "../../utils/httpError";

const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.getUsers();
    response.status(200).json({
      message: "Success!",
      users: result,
    });
  } catch (error) {
    next(new HttpError("Failed to fetch users", 500));
  }
};

const getUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);
  if (isNaN(id)) {
    return next(new HttpError("Invalid user ID", 400));
  }
  try {
    const result = await userService.getUserById(id);
    response.status(200).json({
      message: "Success!",
      users: result,
    });
  } catch (error) {
    next(new HttpError("Failed to fetch user by ID", 500));
  }
};
const getUserByEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const email = request.body.email;

  try {
    const result = await userService.getUserByEmail(email);
    response.status(200).json({
      message: "Success!",
      users: result,
    });
  } catch (error) {
    next(new HttpError("Failed to fetch user by ID", 500));
  }
};
export { getUserById, getUsers, getUserByEmail };
