"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpError_1 = __importDefault(require("../utils/httpError"));
dotenv_1.default.config();
class TokenService {
    constructor() {
        this.token = null;
    }
    createAccessToken(data) {
        const jwtKey = process.env.JWT_KEY;
        if (!jwtKey) {
            throw new httpError_1.default('JWT key is not configured', 500);
        }
        this.token = jsonwebtoken_1.default.sign(data, jwtKey, {
            expiresIn: '45m',
        });
    }
    getToken() {
        return this.token;
    }
}
const tokenService = new TokenService();
exports.default = tokenService;
