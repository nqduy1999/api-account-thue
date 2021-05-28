/* eslint-disable consistent-return */
const fs = require('fs');

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
  });
};

module.exports = async function (req, res, next) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: 'Không có file nào được chọn' });
    }
    const { file } = req.files;
    if (file.size > 1024 * 1024 * 10) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'Không vượt quá 10MB' });//
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: res.err });
  }
};
