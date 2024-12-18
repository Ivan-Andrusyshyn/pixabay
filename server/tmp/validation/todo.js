"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const todoValidationRules = (...fields) => {
    const validations = [];
    if (fields.includes("title")) {
        validations.push((0, express_validator_1.body)("title")
            .isString()
            .withMessage("title must be a string")
            .notEmpty()
            .withMessage("title is required"));
    }
    if (fields.includes("description")) {
        validations.push((0, express_validator_1.body)("description")
            .isString()
            .withMessage("description string format")
            .notEmpty()
            .withMessage("description is required"));
    }
    if (fields.includes("user_id")) {
        validations.push((0, express_validator_1.body)("user_id")
            .isInt({ min: 1 })
            .withMessage("users ID must be a positive integer"));
    }
    if (fields.includes("id")) {
        validations.push((0, express_validator_1.param)("id")
            .isInt({ min: 1 })
            .withMessage("users ID must be a positive integer"));
    }
    return validations;
};
exports.default = todoValidationRules;
