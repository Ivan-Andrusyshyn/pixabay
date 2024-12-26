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
const getAllMediaByIdList = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idList = request.body.idList;
    const userId = request.user._id;
    try {
        const result = yield gallery_1.default.getAllMediaByIdList(userId, idList);
        const ids = result === null || result === void 0 ? void 0 : result.map((item) => item.mediaId);
        console.log(ids);
        response.status(200).json({
            message: 'Success!',
            ids,
        });
    }
    catch (error) {
        next(new httpError_1.default('Failed to fetch gallery by ID', 500));
    }
});
exports.default = getAllMediaByIdList;
