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
const gallery_1 = __importDefault(require("../../services/gallery"));
const createMediaItem = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const mediaItem = request.body;
    if (!mediaItem) {
        response.status(204).send({
            message: 'Wrong media content',
        });
    }
    try {
        const result = yield gallery_1.default.createMediaItem(mediaItem);
        console.log(result);
        response.status(201).json({
            message: 'Media success  created!',
            media: result,
        });
    }
    catch (error) {
        throw new httpError_1.default('Failed to create media.', 500);
    }
});
exports.default = createMediaItem;
