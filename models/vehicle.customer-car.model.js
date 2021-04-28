const mongoose = require('mongoose');

const CustomerCar = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seat: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true
    },
    idOwner: {
      type: String,
      trim: true,
      require
    },
    idModel: {
      type: String,
      trim: true,
      require
    },
    idMake: {
      type: String,
      trim: true,
      require
    },
    idType: {
      type: String,
      trim: true,
      require
    },
    location: {
      cityId: {
        type: Number,
        trim: true,
      },
      countryCode: {
        type: Number,
        trim: true,
      },
      districtId: {
        type: Number,
        trim: true,
      },
      lat: {
        type: Number,
        trim: true,
      },
      lon: {
        type: Number,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
      wardId: {
        type: Number,
        trim: true,
      },
    },
    price: {
      type: Number,
      trim: true,
      require
    },
    locationAddr: {
      type: String,
      trim: true,
    },
    photosVerified: {
      type: Boolean,
      trim: true,
    }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('customer-car', CustomerCar);