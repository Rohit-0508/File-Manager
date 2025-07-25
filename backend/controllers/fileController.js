const File = require("../models/File");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const folderPath = req.body.folderPath || 'uploads';
    const cloudinaryResult = await uploadToCloudinary(req.file.path, folderPath);

    // Fix: Convert "null" string to actual null
    let folderValue = req.body.folderId;
    if (folderValue === "null" || folderValue === undefined) {
      folderValue = null;
    }

    const newFile = new File({
      name: req.file.originalname,
      imageUrl: cloudinaryResult.secure_url,
      folder: folderValue,
      user: req.body.userId,
    });

    const saved = await newFile.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
};

module.exports = uploadImage;