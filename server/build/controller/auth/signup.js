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
const httpError_1 = __importDefault(require("../../utils/httpError"));
const user_1 = __importDefault(require("../../services/user"));
const token_1 = __importDefault(require("../../services/token"));
const signUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, interest } = request.body;
        const createdUser = yield user_1.default.createUser({
            name,
            email,
            password,
            interest,
        });
        token_1.default.createAccessToken({
            name,
            email,
            interest,
            _id: createdUser._id,
        });
        const token = token_1.default.getToken();
        if (!token) {
            response.status(500).json({ message: 'Server error!' });
        }
        response.status(200).json({
            message: 'Success!',
            access_token: token,
            user: {
                name,
                email,
                interest,
                _id: createdUser._id,
            },
        });
    }
    catch (error) {
        throw new httpError_1.default('Failed to create user', 500);
    }
});
exports.default = signUp;
