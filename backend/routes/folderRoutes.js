const express = require('express');
const router = express.Router();
const { createFolder, getUserFolders } = require('../controllers/folderController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/create',verifyToken, createFolder);
router.get('/folders',verifyToken, getUserFolders);


module.exports = router;
