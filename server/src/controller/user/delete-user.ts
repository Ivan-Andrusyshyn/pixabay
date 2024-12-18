import { Request, Response } from "express";

import userService from "../../services/user";
import HttpError from "../../utils/httpError";

const deleteUser = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  try {
    const result = await userService.deleteUser(id);

    response.status(201).send(`User with ID: ${result} deleted`);
  } catch (error) {
    throw new HttpError("Failed to delete user", 500);
  }
};
export default deleteUser;
