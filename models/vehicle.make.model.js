const mongoose = require('mongoose');

const vehicleMakeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
      trim: true,
    },
    logo: {
      type: String,
      require,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('vehicle_make', vehicleMakeSchema);
