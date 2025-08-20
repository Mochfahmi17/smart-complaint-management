"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComplaintSchema = exports.complaintSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.complaintSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, "Title is required."),
    description: zod_1.default.string().min(1, "Description is required.").max(500, "Description is too long. Please enter a value with less than 500 characters."),
    categoryId: zod_1.default.string().min(1, "Category is required."),
    photoUrl: zod_1.default.file("Photo is required.").mime(["image/jpg", "image/jpeg", "image/png", "image/webp"]).max(5_000_000).optional(),
});
exports.updateComplaintSchema = exports.complaintSchema.partial();
