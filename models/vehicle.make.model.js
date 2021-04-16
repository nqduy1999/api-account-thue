const mongoose = require('mongoose');

const vehicleMakeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    name: {
      type: String,
      require,
    },
    logo: {
      type: String,
      require
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('vehicle_make', vehicleMakeSchema);
