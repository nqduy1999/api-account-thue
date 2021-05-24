const mongoose = require('mongoose');

const vehicleModelSchema = new mongoose.Schema(
  {
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle_type',
    },
    makesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle_make',
    },
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
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('vehicle_models', vehicleModelSchema);
