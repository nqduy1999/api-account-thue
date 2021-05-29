const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PostModel = new mongoose.Schema(
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
      type: Number, // 1: Xe đang được thuê, 2: Xe trống, 3: Gửi xác nhận cho chủ xe.
      required: true,
    },
    idOwner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require,
    },
    idModel: {
      type: Schema.Types.ObjectId,
      ref: 'vehicle_models',
      require,
    },
    idMake: {
      type: Schema.Types.ObjectId,
      ref: 'vehicle_makes',
      require,
    },
    idType: {
      type: Schema.Types.ObjectId,
      ref: 'vehicle_types',
      require,
    },
    location: {
      cityId: {
        type: Number,
        trim: true,
      },
      countryCode: {
        type: String,
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
      },
    },
    photos: [
      {
        url: String,
      },
    ],
    photosVerified: {
      type: Boolean,
      trim: true,
    },
    totalTrips: {
      type: Number,
      default: 0,
    },
    isDriver: {
      type: Boolean,
      default: false,
    },
    options: [{
      id: String,
      name: String,
    }],
    requiredPapers: [{
      id: String,
      name: String,
    },
    ],
    vehicleNumber: {
      type: String,
      photo: [{ type: String }],
      require,
    },
    historyContract: [
      {
        type: Schema.Types.ObjectId,
        ref: 'contract',
      },
    ],
    transmission: [{
      id: String,
      name: String,
    }],
    description: {
      type: String,
      require,
    },
    rule: [{
      type: String,
      require,
    }],
    price: {
      type: Number,
      require,
    },
    priceOption: [{
      type: Schema.Types.ObjectId,
      ref: 'PostPrice',
    }],
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('Posts', PostModel);
