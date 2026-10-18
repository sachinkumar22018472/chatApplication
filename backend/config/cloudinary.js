import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const uploadOnCloudinary = async (filePath) => {
  if (!filePath) return null;

  const cloudName = process.env.CLOUD_NAME?.replace(/['"]/g, "").trim();
  const apiKey = process.env.API_KEY?.replace(/['"]/g, "").trim();
  const apiSecret = process.env.API_SECRET?.replace(/['"]/g, "").trim();

  // Try Cloudinary if credentials are provided
  if (cloudName && apiKey && apiSecret) {
    try {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });

      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });

      // Cleanup local temp file after successful Cloudinary upload
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return uploadResult.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed (e.g. disabled key or missing permissions):", error?.message || error);
      console.warn("Falling back to local server storage for uploaded file.");
    }
  }

  // Fallback: Serve the uploaded file from the local server
  try {
    if (fs.existsSync(filePath)) {
      const fileName = path.basename(filePath);
      const port = process.env.PORT || 8000;
      const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
      return `${baseUrl}/public/${fileName}`;
    }
  } catch (localErr) {
    console.error("Local file fallback error:", localErr);
  }

  return null;
};

export default uploadOnCloudinary;