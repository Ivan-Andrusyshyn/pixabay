import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';

const validateFilter = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err: ValidationError) => ({
    field: err.type,
    message: err.msg,
  }));

  if (extractedErrors) {
    res.status(422).json({
      message: 'Validation error',
      errors: extractedErrors,
    });
  }
  next();
};

export default validateFilter;
