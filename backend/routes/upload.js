const express = require('express');
const upload = require('../middlewares/multer');
const  uploadImage  = require('../controllers/fileController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/', verifyToken, upload.single('image'), uploadImage);

module.exports = router;
