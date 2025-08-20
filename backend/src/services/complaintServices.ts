import prisma from "../lib/prisma";

export const allComplaints = async () => {
  try {
    const complaints = await prisma.complaint.findMany({ orderBy: { createdAt: "asc" }, include: { category: true } });

    return complaints;
  } catch (error) {
    throw error;
  }
};

export const allStatus = async () => {
  try {
    const totalCompliment = await prisma.complaint.count();
    const totalWaiting = await prisma.complaint.count({ where: { status: "PENDING" } });
    const totalInProgress = await prisma.complaint.count({ where: { status: "IN_PROGRESS" } });
    const totalDone = await prisma.complaint.count({ where: { status: "CLOSED" } });

    return { totalCompliment, totalWaiting, totalInProgress, totalDone };
  } catch (error) {
    throw error;
  }
};

export const getComplaintById = async (id: string) => {
  try {
    const complaint = await prisma.complaint.findUnique({ where: { id }, include: { category: true } });

    return complaint;
  } catch (error) {
    throw error;
  }
};

export const store = async (title: string, description: string, categoryId: string, photoUrl: string | null, photo_public_id: string | null) => {
  try {
    const complaint = await prisma.complaint.create({ data: { title, description, categoryId, photoUrl, photo_public_id } });

    return complaint;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: string, title: string, description: string, categoryId: string, photoUrl?: string, photo_public_id?: string) => {
  try {
    const complaint = await prisma.complaint.update({ where: { id }, data: { title, description, categoryId, photoUrl, photo_public_id } });

    return complaint;
  } catch (error) {
    throw error;
  }
};

export const destroy = async (id: string) => {
  try {
    const complaint = await prisma.complaint.delete({ where: { id } });

    return complaint;
  } catch (error) {
    throw error;
  }
};
