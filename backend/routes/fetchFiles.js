const express = require('express');
const router = express.Router();
const File = require('../models/File');
const verifyToken = require('../middlewares/verifyToken');
const mongoose= require('mongoose');
router.get('/files', verifyToken, async (req, res) => {
  try {
    const { folderId } = req.query;
    const userId = req.user._id;
    let query = { user: new mongoose.Types.ObjectId(userId) };

    if (folderId === undefined || folderId === "null" || folderId === null) {
      // At root: only files with folder field == null
      query.folder = null;
    } else {
      // In a folder: only files with folder == folderId
      query.folder = new mongoose.Types.ObjectId(folderId);
    }

    const files = await File.find(query).sort({ createdAt: -1 });
    res.json({ files });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch files', error: err.message });
  }
});

module.exports = router;