const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const RatingModel = new mongoose.Schema(
  {
    idPost: {
      type: Schema.Types.ObjectId,
    },
    value: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
);
module.exports = mongoose.model('rating', RatingModel);
