const express = require('express');
const router = express.Router();
const { searchImages } = require('../controllers/imageController'); 
const verifyToken = require('../middlewares/verifyToken')

router.get('/search', verifyToken, searchImages);


module.exports = router;
