const mongoose = require('mongoose');

const postModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      trim: true,
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
    }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('post', postModel);