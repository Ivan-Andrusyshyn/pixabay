import { Request, Response } from "express";

import userService from "../../services/user";
import HttpError from "../../utils/httpError";

const updateUser = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  try {
    const updatedUser = await userService.updateUser(name, email, id);
    response.status(201).json({
      message: "Success!",
      updatedUser,
    });
  } catch (error) {
    throw new HttpError("Failed to update user", 500);
  }
};

export default updateUser;
