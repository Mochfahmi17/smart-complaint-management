import { NextFunction, Request, Response } from "express";
import { allComplaints, allStatus, destroy, getComplaintById, store, update } from "../services/complaintServices";
import createHttpError from "http-errors";
import uploadToCloudinary from "../utils/uploadToCloudinary";
import destroyFromCloudinary from "../utils/destroyFromCloudinary";

export const getAllComplaints = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const complaints = await allComplaints();

    return res.status(200).json({ success: true, error: false, data: complaints });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return next(createHttpError(500, "Something went wrong!"));
    }

    throw error;
  }
};

export const getStatusComplaints = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { totalCompliment, totalWaiting, totalInProgress, totalDone } = await allStatus();

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
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return next(createHttpError(500, "Something went wrong!"));
    }

    throw error;
  }
};

export const getDetailComplaint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const complaint = await getComplaintById(id);
    if (!complaint) {
      return next(createHttpError(404, "Complaint not found!"));
    }

    return res.status(200).json({ success: true, error: false, data: complaint });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return next(createHttpError(500, "Something went wrong!"));
    }

    throw error;
  }
};

export const createComplaint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, categoryId } = req.body;
    const photo = req.file?.path;

    let secure_Url: string | null = null;
    let public_id: string | null = null;

    if (photo) {
      const result = await uploadToCloudinary(photo, "complaintImage");
      secure_Url = result.secure_url;
      public_id = result.public_id;
    }

    const complaint = await store(title, description, categoryId, secure_Url, public_id);

    return res.status(201).json({ success: true, error: false, message: "Successfully create complaint!", data: complaint });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return next(createHttpError(500, "Something went wrong!"));
    }

    throw error;
  }
};

export const editComplaint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId } = req.body;
    const photo = req.file?.path;

    const complaint = await getComplaintById(id);
    if (!complaint) {
      return next(createHttpError(404, "Complaint not found!"));
    }

    let photoUrl: string | undefined = complaint.photoUrl ?? undefined;
    let photo_public_id: string | undefined = complaint.photo_public_id ?? undefined;
    if (photo) {
      if (photo_public_id) {
        await destroyFromCloudinary(photo_public_id);
      }

      const uploadResult = await uploadToCloudinary(photo, "complaintImage");
      photoUrl = uploadResult.secure_url;
      photo_public_id = uploadResult.public_id;
    }

    const updateComplaint = await update(id, title, description, categoryId, photoUrl, photo_public_id);
    return res.status(200).json({
      success: true,
      error: false,
      message: "Successfully to update this complaint",
      data: updateComplaint,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return next(createHttpError(500, "Something went wrong!"));
    }

    throw error;
  }
};

export const deleteComplaint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const complaint = await getComplaintById(id);
    if (!complaint) {
      return next(createHttpError(404, "Complaint not found!"));
    }

    if (complaint.photo_public_id) {
      await destroyFromCloudinary(complaint.photo_public_id);
    }

    await destroy(complaint.id);
    return res.status(200).json({
      success: true,
      error: false,
      message: "Deleted complaint successfully!",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return next(createHttpError(500, "Something went wrong!"));
    }

    throw error;
  }
};
