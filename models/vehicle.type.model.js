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
    model: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle_models',
    }],

  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('vehicle_type', vehicleTypeSchema);
