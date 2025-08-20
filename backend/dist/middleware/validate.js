"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return result.error.issues.map((err) => next((0, http_errors_1.default)(400, err.message)));
        }
        req.body = result.data;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, success: false, message: "Terjadi kesalahan saat validasi!" });
    }
};
exports.default = validate;
