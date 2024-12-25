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
const updateMediaItem = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const mediaData = request.body;
    if (!mediaData) {
        response.status(204).send({
            message: 'Wrong media content',
        });
    }
    try {
        const updatedUser = yield gallery_1.default.updateMediaItem(id, mediaData);
        response.status(201).json({
            message: 'Success!',
            updatedUser,
        });
    }
    catch (error) {
        throw new httpError_1.default('Failed to update media file', 500);
    }
});
exports.default = updateMediaItem;
