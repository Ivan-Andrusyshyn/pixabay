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
dotenv_1.default.config();
const jwtMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const request = req;
    try {
        const result = yield user_1.default.getUserByEmail(email);
        if (result && result.email && result.name && result.id) {
            const id = result.id;
            const token = jsonwebtoken_1.default.sign({ name, email, id }, process.env.JWT_KEY, {
                expiresIn: '45m',
            });
            request.token = token;
            request.user = result;
        }
    }
    catch (error) {
        res.status(403).json({ message: 'User is not exist!' });
    }
    finally {
        next();
    }
});
exports.default = jwtMiddleware;
