import { body, param } from "express-validator";

const userValidationRules = (...fields: string[]) => {
  const validations = [];

  if (fields.includes("name")) {
    validations.push(
      body("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name is required")
    );
  }

  if (fields.includes("email")) {
    validations.push(
      body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email is required")
    );
  }

  if (fields.includes("id")) {
    validations.push(
      param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer")
    );
  }

  return validations;
};

export default userValidationRules;
