const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      trim: true,
    },
    comment: {
      type: String,
      default: 'ga',
    },
    serviceType: {
      type: Number,
    },
    postId: {
      type: String,
      require,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('Reviews', reviewSchema);
