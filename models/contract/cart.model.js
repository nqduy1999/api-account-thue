const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const vehicleMakeSchema = new mongoose.Schema(
  {
    idPost: {
      type: Schema.Types.ObjectId,
      require,
    },
    priceService: {
      type: Number,
    },
    priceInsurance: {
      type: Number,
    },
    tripFee: Number,
    tripFeePercent: Number,
    totalAllDay: Number,
  },
);
module.exports = mongoose.model('vehicle_make', vehicleMakeSchema);
