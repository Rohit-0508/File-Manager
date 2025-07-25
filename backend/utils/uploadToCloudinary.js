const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (localFilePath, folderPath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folderPath,
      resource_type: "image"
    });

    fs.unlinkSync(localFilePath); // Delete local file after upload
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Clean up even if upload fails
    throw error;
  }
};

module.exports = uploadToCloudinary;
