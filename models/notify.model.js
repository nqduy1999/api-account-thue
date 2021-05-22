const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const NotifyModel = new mongoose.Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
  },
);
module.exports = mongoose.model('notify', NotifyModel);
