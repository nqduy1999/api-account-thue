const mongoose = require('mongoose');

const RequirePapersModel = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'CMND và GPLX (đối chiếu)',
    },
    logo: {
      type: String,
      default: 'https://res.cloudinary.com/clduykhang/image/upload/v1619962419/system/icon_cmnd_auwbor.png',
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
  },
);
module.exports = mongoose.model('requirePapers', RequirePapersModel);
