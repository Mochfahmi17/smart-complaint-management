import cloudinary from "../lib/cloudinary";

const destroyFromCloudinary = async (publicId: string): Promise<void> => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("failed to destroy from Cloudinary: ", error);
    throw error;
  }
};

export default destroyFromCloudinary;
