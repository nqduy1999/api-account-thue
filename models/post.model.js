const mongoose = require('mongoose');

const postModel = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('post', postModel);