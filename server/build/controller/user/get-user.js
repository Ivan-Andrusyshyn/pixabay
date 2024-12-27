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
exports.getUserByEmail = exports.getUsers = exports.getUserById = void 0;
const user_1 = __importDefault(require("../../services/user"));
const httpError_1 = __importDefault(require("../../utils/httpError"));
const getUsers = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.default.getUsers();
        response.status(200).json({
            message: "Success!",
            users: result,
        });
    }
    catch (error) {
        next(new httpError_1.default("Failed to fetch users", 500));
    }
});
exports.getUsers = getUsers;
const getUserById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
        return next(new httpError_1.default("Invalid user ID", 400));
    }
    try {
        const result = yield user_1.default.getUserById(id);
        response.status(200).json({
            message: "Success!",
            users: result,
        });
    }
    catch (error) {
        next(new httpError_1.default("Failed to fetch user by ID", 500));
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.body.email;
    try {
        const result = yield user_1.default.getUserByEmail(email);
        response.status(200).json({
            message: "Success!",
            users: result,
        });
    }
    catch (error) {
        next(new httpError_1.default("Failed to fetch user by ID", 500));
    }
});
exports.getUserByEmail = getUserByEmail;
