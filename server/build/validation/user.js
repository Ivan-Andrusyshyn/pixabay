"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const userValidationRules = (...fields) => {
    const validations = [];
    if (fields.includes('name')) {
        validations.push((0, express_validator_1.body)('name')
            .isString()
            .withMessage('Name must be a string')
            .notEmpty()
            .withMessage('Name is required'));
    }
    if (fields.includes('email')) {
        validations.push((0, express_validator_1.body)('email')
            .isEmail()
            .withMessage('Invalid email format')
            .notEmpty()
            .withMessage('Email is required'));
    }
    if (fields.includes('password')) {
        validations.push((0, express_validator_1.body)('password')
            .isString()
            .withMessage('Password must be a string')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/\d/)
            .withMessage('Password must contain a number')
            .matches(/[A-Z]/)
            .withMessage('Password must contain an uppercase letter')
            .notEmpty()
            .withMessage('Password is required'));
    }
    if (fields.includes('interest')) {
        validations.push((0, express_validator_1.body)('interest')
            .isArray({ min: 1 })
            .withMessage('Interest must be a non-empty array')
            .custom((array) => array.every((item) => typeof item === 'string'))
            .withMessage('Each interest must be a string'));
    }
    if (fields.includes('id')) {
        validations.push((0, express_validator_1.param)('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'));
    }
    return validations;
};
exports.default = userValidationRules;
