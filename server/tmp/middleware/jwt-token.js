"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../services/user"));
const httpError_1 = __importDefault(require("../utils/httpError"));
dotenv_1.default.config();
const jwtMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req;
        const userEmail = req.body.email;
        if (!userEmail) {
            throw new httpError_1.default('Email is required', 400);
        }
        const result = yield user_1.default.getUserByEmail(userEmail);
        if (!result) {
            throw new httpError_1.default('User does not exist', 401);
        }
        const { _id, name, email, interest } = result;
        if (!_id || !name || !email) {
            throw new httpError_1.default('Invalid user data', 500);
        }
        const userData = {
            id: _id.toString(),
            name,
            email,
            interest,
        };
        const jwtKey = process.env.JWT_KEY;
        if (!jwtKey) {
            throw new httpError_1.default('JWT key is not configured', 500);
        }
        const token = jsonwebtoken_1.default.sign(userData, jwtKey, {
            expiresIn: '45m',
        });
        request.token = token;
        request.user = userData;
        next();
    }
    catch (error) {
        console.error('Middleware error:', error);
        if (error instanceof httpError_1.default) {
            return res.status(error.statusCode).json({ message: error.message }); // Добавлен return
        }
        return res.status(500).json({ message: 'Internal server error' }); // Добавлен return
    }
});
exports.default = jwtMiddleware;
