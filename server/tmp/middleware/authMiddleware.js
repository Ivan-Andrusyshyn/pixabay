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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res
                .status(401)
                .json({ message: 'Authorization token missing or malformed' });
        }
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace('Bearer ', '');
        console.log(token);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        if (!decoded || !decoded.name || !decoded.id || !decoded.email) {
            res.status(401).json({ message: 'Invalid token payload' });
        }
        req.user = decoded;
        req.token = token;
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token' });
        }
        else if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ message: 'Token has expired' });
        }
        res.status(500).json({ message: err.message });
    }
});
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
