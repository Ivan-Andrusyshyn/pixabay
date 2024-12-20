import { body, param } from 'express-validator';

const userValidationRules = (...fields: string[]) => {
  const validations = [];

  if (fields.includes('name')) {
    validations.push(
      body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
    );
  }

  if (fields.includes('email')) {
    validations.push(
      body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .notEmpty()
        .withMessage('Email is required')
    );
  }

  if (fields.includes('password')) {
    validations.push(
      body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter')
        .notEmpty()
        .withMessage('Password is required')
    );
  }

  if (fields.includes('interest')) {
    validations.push(
      body('interest')
        .isArray({ min: 1 })
        .withMessage('Interest must be a non-empty array')
        .custom((array: any[]) =>
          array.every((item) => typeof item === 'string')
        )
        .withMessage('Each interest must be a string')
    );
  }

  if (fields.includes('id')) {
    validations.push(
      param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer')
    );
  }

  return validations;
};

export default userValidationRules;
