const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PostModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seat: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
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
    address: {
      locationString: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
      },
      lat: {
        type: Number,
        trim: true,
      },
      lng: {
        type: Number,
        trim: true,
      },
    },
    rating:
    {
      avg: {
        type: Number,
        default: 0,
      },
      listRating: [
        {
          type: Schema.Types.ObjectId,
          ref: 'rating',
        },
      ],
    },
    locationString: {
      type: String,
      require,
    },
    photos: [
      String,
    ],
    typePost: {
      type: String,
      default: 'NO_DRIVER',
    },
    options: [{
      _id: String,
      name: String,
      logo: String,
    }],
    vehicleNumber: {
      code: String,
    },
    historyContract: [
      {
        type: Schema.Types.ObjectId,
        ref: 'contract',
      },
    ],
    transmission: {
      id: String,
      name: String,
    },
    description: {
      type: String,
      require,
    },
    rule: {
      type: String,
      require,
    },
    price: {
      pricePerDay: Number,
      pricePerHour: Number,
      depositFee: Number,
    },
    isDriver: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    collateral: {
      isCollateral: Boolean,
      content: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Posts', PostModel);
