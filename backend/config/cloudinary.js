import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const uploadOnCloudinary = async (filePath) => {
  if (!filePath) return null;

  const cloudName = process.env.CLOUD_NAME?.replace(/['"]/g, "").trim();
  const apiKey = process.env.API_KEY?.replace(/['"]/g, "").trim();
  const apiSecret = process.env.API_SECRET?.replace(/['"]/g, "").trim();

  // Try Cloudinary with a 5 second timeout so chat never hangs
  if (cloudName && apiKey && apiSecret) {
    try {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });

      const uploadPromise = cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Cloudinary timeout")), 5000)
      );

      const uploadResult = await Promise.race([uploadPromise, timeoutPromise]);

      if (uploadResult?.secure_url) {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        return uploadResult.secure_url;
      }
    } catch (error) {
      console.warn("Cloudinary upload failed or timed out:", error?.message || error);
    }
  }

  // Fallback: Serve the uploaded file from the server
  try {
    if (fs.existsSync(filePath)) {
      const fileName = path.basename(filePath);
      const port = process.env.PORT || 8000;
      const baseUrl =
        process.env.BASE_URL ||
        process.env.RENDER_EXTERNAL_URL ||
        "https://chatapplication-vnry.onrender.com";
      return `${baseUrl}/public/${fileName}`;
    }
  } catch (localErr) {
    console.error("Local file fallback error:", localErr);
  }

  return null;
};

export default uploadOnCloudinary;