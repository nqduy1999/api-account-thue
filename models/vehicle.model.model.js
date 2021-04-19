const mongoose = require('mongoose');

const vehicleModelSchema = new mongoose.Schema(
  {
    typeId: {
      type: String,
      required: true,
    },
    makesId: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require,
      unique: true,
      trim: true,
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
module.exports = mongoose.model('vehicle_models', vehicleModelSchema);
