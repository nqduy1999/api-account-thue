const mongoose = require('mongoose');

const postModel = new mongoose.Schema(
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
    rating:
    {
      avg: {
        type: Number,
      },
      star1: {
        type: Number,
      },
      star2: {
        type: Number,
      },
      star3: {
        type: Number,
      },
      star4: {
        type: Number,
      },
      star5: {
        type: Number,
      }
    },
    photos: [
      {
        url: {
          type: String
        }
      }
    ],
    photosVerified: {
      type: Boolean,
      trim: true,
    },
    requiredPapers: [

    ]
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('post', postModel);