"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const categoryServices_1 = require("../services/categoryServices");
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await (0, categoryServices_1.allCategories)();
        return res.status(200).json({
            success: true,
            error: false,
            data: categories,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(500, "Something went wrong!"));
        }
        throw error;
    }
};
exports.getAllCategories = getAllCategories;
