const mongoose = require('mongoose');

const vehicleTypeSchema = new mongoose.Schema(
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
      unique: true
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
module.exports = mongoose.model('vehicle_type', vehicleTypeSchema);
