"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = __importDefault(require("../controller/auth/signup"));
const signin_1 = __importDefault(require("../controller/auth/signin"));
const user_1 = __importDefault(require("../validation/user"));
const jwt_token_1 = __importDefault(require("../middleware/jwt-token"));
const checkToken_1 = __importDefault(require("../controller/auth/checkToken"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const validateFilter_1 = __importDefault(require("../middleware/validateFilter"));
const authRoutes = (0, express_1.Router)();
authRoutes.post('/signup', (0, user_1.default)('name', 'email', 'password', 'interest'), validateFilter_1.default, signup_1.default);
authRoutes.post('/signin', (0, user_1.default)('email', 'password'), validateFilter_1.default, jwt_token_1.default, signin_1.default);
authRoutes.get('/check-token', authMiddleware_1.default, checkToken_1.default);
exports.default = authRoutes;
