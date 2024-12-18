import { Request, Response } from "express";

import userService from "../../services/user";
import User from "./user.interface";
import HttpError from "../../utils/httpError";

const createUser = async (request: Request, response: Response) => {
  const { name, email } = request.body;
  try {
    const createdUser = await userService.createUser(name, email);
    response.status(201).json({
      message: "Success!",
      createdUser,
    });
  } catch (error) {
    throw new HttpError("Failed to create user", 500);
  }
};

export default createUser;
