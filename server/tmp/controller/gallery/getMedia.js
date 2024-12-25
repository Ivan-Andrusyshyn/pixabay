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
exports.getMediaItemById = exports.getGallery = void 0;
const httpError_1 = __importDefault(require("../../utils/httpError"));
const gallery_1 = __importDefault(require("../../services/gallery"));
const getGallery = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.user.id;
    try {
        const result = yield gallery_1.default.getGallery(userId);
        response.status(200).json({
            message: 'Success!',
            media: result,
        });
    }
    catch (error) {
        next(new httpError_1.default('Failed to fetch users', 500));
    }
});
exports.getGallery = getGallery;
const getMediaItemById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
        return next(new httpError_1.default('Invalid ID', 400));
    }
    try {
        const result = yield gallery_1.default.getMediaItemById(id);
        console.log(result);
        response.status(200).json({
            message: 'Success!',
            media: result,
        });
    }
    catch (error) {
        next(new httpError_1.default('Failed to fetch gallery by ID', 500));
    }
});
exports.getMediaItemById = getMediaItemById;
