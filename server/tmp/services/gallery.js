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
const gallery_schema_1 = __importDefault(require("../db/gallery.schema"));
class GalleryService {
    getGallery(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield gallery_schema_1.default.find({ userId });
            }
            catch (error) {
                console.error('Error fetching gallery items:', error);
                throw new Error('Failed to fetch gallery items');
            }
        });
    }
    getMediaItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Fetching media item by ID: ${id}`);
            try {
                return yield gallery_schema_1.default.findOne({ id });
            }
            catch (error) {
                console.error('Error fetching media item by ID:', error);
                throw new Error('Failed to fetch media item');
            }
        });
    }
    getAllMediaByIdList(userId, idList) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!idList || idList.length === 0) {
                    return [];
                }
                return yield gallery_schema_1.default.find({
                    userId,
                    mediaId: { $in: idList },
                });
            }
            catch (error) {
                console.error('Error fetching media item by ID:', error);
            }
        });
    }
    createMediaItem(mediaItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const media = new gallery_schema_1.default(mediaItem);
                return yield media.save();
            }
            catch (error) {
                console.error('Error creating media item:', error);
                throw new Error('Failed to create media item');
            }
        });
    }
    updateMediaItem(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedMediaItem = yield gallery_schema_1.default.findByIdAndUpdate(updateData, {
                    new: true,
                    runValidators: true,
                });
                if (!updatedMediaItem) {
                    throw new Error('Media item not found');
                }
                return updatedMediaItem;
            }
            catch (error) {
                console.error('Error updating media item:', error);
                throw new Error('Failed to update media item');
            }
        });
    }
    deleteMediaItem(mediaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mediaItem = yield gallery_schema_1.default.findByIdAndDelete(mediaId);
                if (!mediaItem) {
                    throw new Error('Media item not found');
                }
                return mediaId;
            }
            catch (error) {
                console.error('Error deleting media item:', error);
                throw new Error('Failed to delete media item');
            }
        });
    }
}
const galleryService = new GalleryService();
exports.default = galleryService;
