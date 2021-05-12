const mongoose = require('mongoose');

const PriceDaySchema = new mongoose.Schema(
  {
    idPost: mongoose.Schema.Types.ObjectId,
    day: {
      type: Date,
      default: Date.now(),
    },
    price: {
      type: Number,
      trim: true,
      require,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
  },
);
module.exports = mongoose.model('vehicle_make', PriceDaySchema);
