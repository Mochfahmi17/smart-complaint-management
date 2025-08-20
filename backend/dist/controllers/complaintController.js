"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComplaint = exports.editComplaint = exports.createComplaint = exports.getDetailComplaint = exports.getStatusComplaints = exports.getAllComplaints = void 0;
const complaintServices_1 = require("../services/complaintServices");
const http_errors_1 = __importDefault(require("http-errors"));
const uploadToCloudinary_1 = __importDefault(require("../utils/uploadToCloudinary"));
const destroyFromCloudinary_1 = __importDefault(require("../utils/destroyFromCloudinary"));
const getAllComplaints = async (req, res, next) => {
    try {
        const complaints = await (0, complaintServices_1.allComplaints)();
        return res.status(200).json({ success: true, error: false, data: complaints });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(500, "Something went wrong!"));
        }
        throw error;
    }
};
exports.getAllComplaints = getAllComplaints;
const getStatusComplaints = async (req, res, next) => {
    try {
        const { totalCompliment, totalWaiting, totalInProgress, totalDone } = await (0, complaintServices_1.allStatus)();
        const stats = {
            totalCompliment,
            totalWaiting,
            totalInProgress,
            totalDone,
        };
        return res.status(200).json({
            success: true,
            error: false,
            data: stats,
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
exports.getStatusComplaints = getStatusComplaints;
const getDetailComplaint = async (req, res, next) => {
    try {
        const { id } = req.params;
        const complaint = await (0, complaintServices_1.getComplaintById)(id);
        if (!complaint) {
            return next((0, http_errors_1.default)(404, "Complaint not found!"));
        }
        return res.status(200).json({ success: true, error: false, data: complaint });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(500, "Something went wrong!"));
        }
        throw error;
    }
};
exports.getDetailComplaint = getDetailComplaint;
const createComplaint = async (req, res, next) => {
    try {
        const { title, description, categoryId } = req.body;
        const photo = req.file?.path;
        let secure_Url = null;
        let public_id = null;
        if (photo) {
            const result = await (0, uploadToCloudinary_1.default)(photo, "complaintImage");
            secure_Url = result.secure_url;
            public_id = result.public_id;
        }
        const complaint = await (0, complaintServices_1.store)(title, description, categoryId, secure_Url, public_id);
        return res.status(201).json({ success: true, error: false, message: "Successfully create complaint!", data: complaint });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(500, "Something went wrong!"));
        }
        throw error;
    }
};
exports.createComplaint = createComplaint;
const editComplaint = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, categoryId } = req.body;
        const photo = req.file?.path;
        const complaint = await (0, complaintServices_1.getComplaintById)(id);
        if (!complaint) {
            return next((0, http_errors_1.default)(404, "Complaint not found!"));
        }
        let photoUrl = complaint.photoUrl ?? undefined;
        let photo_public_id = complaint.photo_public_id ?? undefined;
        if (photo) {
            if (photo_public_id) {
                await (0, destroyFromCloudinary_1.default)(photo_public_id);
            }
            const uploadResult = await (0, uploadToCloudinary_1.default)(photo, "complaintImage");
            photoUrl = uploadResult.secure_url;
            photo_public_id = uploadResult.public_id;
        }
        const updateComplaint = await (0, complaintServices_1.update)(id, title, description, categoryId, photoUrl, photo_public_id);
        return res.status(200).json({
            success: true,
            error: false,
            message: "Successfully to update this complaint",
            data: updateComplaint,
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
exports.editComplaint = editComplaint;
const deleteComplaint = async (req, res, next) => {
    try {
        const { id } = req.params;
        const complaint = await (0, complaintServices_1.getComplaintById)(id);
        if (!complaint) {
            return next((0, http_errors_1.default)(404, "Complaint not found!"));
        }
        if (complaint.photo_public_id) {
            await (0, destroyFromCloudinary_1.default)(complaint.photo_public_id);
        }
        await (0, complaintServices_1.destroy)(complaint.id);
        return res.status(200).json({
            success: true,
            error: false,
            message: "Deleted complaint successfully!",
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
exports.deleteComplaint = deleteComplaint;
