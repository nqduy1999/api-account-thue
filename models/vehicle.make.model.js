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
    model: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle_models',
    }],
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('vehicle_make', vehicleMakeSchema);
