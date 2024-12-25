"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const galleryValidationRules = (...fields) => {
    const validations = [];
    if (fields.includes('comments')) {
        validations.push((0, express_validator_1.body)('comments')
            .isInt({ min: 0 })
            .withMessage('Comments must be a non-negative integer')
            .notEmpty()
            .withMessage('Comments are required'));
    }
    if (fields.includes('downloads')) {
        validations.push((0, express_validator_1.body)('downloads')
            .isInt({ min: 0 })
            .withMessage('Downloads must be a non-negative integer')
            .notEmpty()
            .withMessage('Downloads are required'));
    }
    if (fields.includes('mediaId')) {
        validations.push((0, express_validator_1.body)('mediaId').notEmpty().withMessage('mediaId is required'));
    }
    if (fields.includes('userId')) {
        validations.push((0, express_validator_1.body)('userId')
            .notEmpty()
            .withMessage('User ID is required')
            .isString()
            .withMessage('User ID must exist like string'));
    }
    if (fields.includes('likes')) {
        validations.push((0, express_validator_1.body)('likes')
            .isInt({ min: 0 })
            .withMessage('Likes must be a non-negative integer')
            .notEmpty()
            .withMessage('Likes are required'));
    }
    if (fields.includes('tags')) {
        validations.push((0, express_validator_1.body)('tags')
            .isArray({ min: 1 })
            .withMessage('Tags must be a non-empty array')
            .custom((tags) => tags.every((tag) => typeof tag === 'string'))
            .withMessage('Each tag must be a string'));
    }
    if (fields.includes('largeImageURL')) {
        validations.push((0, express_validator_1.body)('largeImageURL')
            .optional()
            .isString()
            .withMessage('Large Image URL must be a string')
            .isURL()
            .withMessage('Large Image URL must be a valid URL'));
    }
    if (fields.includes('video.url')) {
        validations.push((0, express_validator_1.body)('video.url')
            .optional()
            .isString()
            .withMessage('Video URL must be a string')
            .isURL()
            .withMessage('Video URL must be a valid URL'));
    }
    if (fields.includes('video.width')) {
        validations.push((0, express_validator_1.body)('video.width')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Video width must be a non-negative integer'));
    }
    if (fields.includes('video.height')) {
        validations.push((0, express_validator_1.body)('video.height')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Video height must be a non-negative integer'));
    }
    if (fields.includes('video.size')) {
        validations.push((0, express_validator_1.body)('video.size')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Video size must be a non-negative integer'));
    }
    if (fields.includes('video.thumbnail')) {
        validations.push((0, express_validator_1.body)('video.thumbnail')
            .optional()
            .isString()
            .withMessage('Video thumbnail must be a string')
            .isURL()
            .withMessage('Video thumbnail must be a valid URL'));
    }
    return validations;
};
exports.default = galleryValidationRules;
