"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allCategories = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const allCategories = async () => {
    try {
        const categories = await prisma_1.default.category.findMany();
        return categories;
    }
    catch (error) {
        throw error;
    }
};
exports.allCategories = allCategories;
