const mongoose = require('mongoose');

const RequestModel = new mongoose.Schema(
  {
    idUser: {
      type: String,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
    data: {},
  },
);
module.exports = mongoose.model('request', RequestModel);
