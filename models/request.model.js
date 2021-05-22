const mongoose = require('mongoose');

const RequestModel = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    images: [{
      type: String,
      default: false,
    }],
    status: {
      type: String,
      default: 'PENDING',
    },
  },
);
module.exports = mongoose.model('request', RequestModel);
