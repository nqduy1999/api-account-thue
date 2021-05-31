const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PostPriceSchema = new mongoose.Schema(
  {
    day: { type: Date, require, default: Date.now() },
    price: { type: Number, require },
    isHire: {
      type: Boolean,
      default: false,
    },
    idPost: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    },
  },
);
module.exports = mongoose.model('PostPrice', PostPriceSchema);
