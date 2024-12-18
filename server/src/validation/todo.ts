import { body, param } from "express-validator";

const todoValidationRules = (...fields: string[]) => {
  const validations = [];

  if (fields.includes("title")) {
    validations.push(
      body("title")
        .isString()
        .withMessage("title must be a string")
        .notEmpty()
        .withMessage("title is required")
    );
  }

  if (fields.includes("description")) {
    validations.push(
      body("description")
        .isString()
        .withMessage("description string format")
        .notEmpty()
        .withMessage("description is required")
    );
  }

  if (fields.includes("user_id")) {
    validations.push(
      body("user_id")
        .isInt({ min: 1 })
        .withMessage("users ID must be a positive integer")
    );
  }
  if (fields.includes("id")) {
    validations.push(
      param("id")
        .isInt({ min: 1 })
        .withMessage("users ID must be a positive integer")
    );
  }
  return validations;
};

export default todoValidationRules;
