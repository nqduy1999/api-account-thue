const router = require('express').Router();
const uploadImage = require('../middleware/uploadImage');
const auth = require('../middleware/auth');
const uploadService = require('../services/upload.services');

router.post('/upload', auth, uploadImage, uploadService.uploadAvatar);

module.exports = router;
