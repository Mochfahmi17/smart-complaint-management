import { UploadApiResponse } from "cloudinary";
import cloudinary from "../lib/cloudinary";

const uploadToCloudinary = async (filePath: string, subFolder: string = "smartComplaintManagement"): Promise<{ secure_url: string; public_id: string }> => {
  const result: UploadApiResponse = await cloudinary.uploader.upload(filePath, {
    folder: subFolder ? `smartComplaintManagement${subFolder}` : subFolder,
  });

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
};

export default uploadToCloudinary;
