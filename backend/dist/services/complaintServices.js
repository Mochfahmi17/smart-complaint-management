"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.store = exports.getComplaintById = exports.allStatus = exports.allComplaints = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const allComplaints = async () => {
    try {
        const complaints = await prisma_1.default.complaint.findMany({ orderBy: { createdAt: "asc" }, include: { category: true } });
        return complaints;
    }
    catch (error) {
        throw error;
    }
};
exports.allComplaints = allComplaints;
const allStatus = async () => {
    try {
        const totalCompliment = await prisma_1.default.complaint.count();
        const totalWaiting = await prisma_1.default.complaint.count({ where: { status: "PENDING" } });
        const totalInProgress = await prisma_1.default.complaint.count({ where: { status: "IN_PROGRESS" } });
        const totalDone = await prisma_1.default.complaint.count({ where: { status: "CLOSED" } });
        return { totalCompliment, totalWaiting, totalInProgress, totalDone };
    }
    catch (error) {
        throw error;
    }
};
exports.allStatus = allStatus;
const getComplaintById = async (id) => {
    try {
        const complaint = await prisma_1.default.complaint.findUnique({ where: { id }, include: { category: true } });
        return complaint;
    }
    catch (error) {
        throw error;
    }
};
exports.getComplaintById = getComplaintById;
const store = async (title, description, categoryId, photoUrl, photo_public_id) => {
    try {
        const complaint = await prisma_1.default.complaint.create({ data: { title, description, categoryId, photoUrl, photo_public_id } });
        return complaint;
    }
    catch (error) {
        throw error;
    }
};
exports.store = store;
const update = async (id, title, description, categoryId, photoUrl, photo_public_id) => {
    try {
        const complaint = await prisma_1.default.complaint.update({ where: { id }, data: { title, description, categoryId, photoUrl, photo_public_id } });
        return complaint;
    }
    catch (error) {
        throw error;
    }
};
exports.update = update;
const destroy = async (id) => {
    try {
        const complaint = await prisma_1.default.complaint.delete({ where: { id } });
        return complaint;
    }
    catch (error) {
        throw error;
    }
};
exports.destroy = destroy;
