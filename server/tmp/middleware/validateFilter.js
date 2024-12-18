"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateFilter = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = errors.array().map((err) => ({
        field: err.type,
        message: err.msg,
    }));
    if (extractedErrors) {
        res.status(422).json({
            message: "Validation error",
            errors: extractedErrors,
        });
    }
    next();
};
exports.default = validateFilter;
