const mongoose = require('mongoose');

const vehicleTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
      unique: true,
      trim: true,
    },
    logo: {
      type: String,
      require,
    },
    key: {
      type: String,
    },

  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('vehicle_type', vehicleTypeSchema);
