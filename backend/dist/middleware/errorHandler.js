"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || err.status || 500;
    return res.status(statusCode).json({ error: true, success: false, message: err.message });
}
