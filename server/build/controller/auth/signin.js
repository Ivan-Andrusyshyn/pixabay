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
const signIn = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customRequest = request;
        const user = customRequest.user;
        const token = customRequest.token;
        response.status(200).json({
            message: 'Success!',
            access_token: token,
            user,
        });
    }
    catch (error) {
        next(new httpError_1.default('Failed login', 500));
    }
});
exports.default = signIn;
