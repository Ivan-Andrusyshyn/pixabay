"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const userValidationRules = (...fields) => {
    const validations = [];
    if (fields.includes("name")) {
        validations.push((0, express_validator_1.body)("name")
            .isString()
            .withMessage("Name must be a string")
            .notEmpty()
            .withMessage("Name is required"));
    }
    if (fields.includes("email")) {
        validations.push((0, express_validator_1.body)("email")
            .isEmail()
            .withMessage("Invalid email format")
            .notEmpty()
            .withMessage("Email is required"));
    }
    if (fields.includes("id")) {
        validations.push((0, express_validator_1.param)("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"));
    }
    return validations;
};
exports.default = userValidationRules;
