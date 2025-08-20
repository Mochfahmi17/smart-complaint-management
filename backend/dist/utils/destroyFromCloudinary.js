"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const destroyFromCloudinary = async (publicId) => {
    if (!publicId)
        return;
    try {
        const result = await cloudinary_1.default.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        console.error("failed to destroy from Cloudinary: ", error);
        throw error;
    }
};
exports.default = destroyFromCloudinary;
