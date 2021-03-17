const router = require('express').Router();
const uploadImage = require('../middleware/uploadImage');
const uploadService = require('../services/uploadService');
router.post('/upload', uploadService.uploadAvatar);

module.exports = router;