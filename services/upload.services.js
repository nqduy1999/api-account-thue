/* eslint-disable consistent-return */
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
  });
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: '498791393421432',
  api_secret: process.env.CLOUD_API_SECRET,
});
const uploadService = {
  uploadAvatar: async (req, res) => {
    try {
      const { file } = req.files;
      cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'avatar',
      }, async (err, result) => {
        if (err) {
          throw err;
        }
        removeTmp(file.tempFilePath);
        res.json({ url: result.secure_url });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = uploadService;
