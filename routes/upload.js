const router = require('express').Router();
const uploadImage = require('../middleware/uploadImage');
const auth = require('../middleware/auth');
const uploadService = require('../services/uploadService');
router.post('/upload', uploadImage, auth, uploadService.uploadAvatar);

module.exports = router;