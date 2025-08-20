"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const uploadToCloudinary = async (filePath, subFolder = "smartComplaintManagement") => {
    const result = await cloudinary_1.default.uploader.upload(filePath, {
        folder: subFolder ? `smartComplaintManagement${subFolder}` : subFolder,
    });
    return {
        secure_url: result.secure_url,
        public_id: result.public_id,
    };
};
exports.default = uploadToCloudinary;
