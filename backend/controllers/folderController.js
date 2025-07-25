const Folder = require('../models/Folder');

exports.createFolder = async (req, res) => {
  try {
    const { name, parent } = req.body;

    const newFolder = new Folder({
      name,
      parent: parent || null,
      user: req.user._id,
    });

    const saved = await newFolder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Folder creation failed', error: err.message });
  }
};


exports.getUserFolders = async (req, res) => {
  try {
    const userId = req.user._id;

    const folders = await Folder.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      folders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch folders",
      error: error.message,
    });
  }
};


