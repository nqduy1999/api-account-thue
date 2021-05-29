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
    note: {
      type: String,
      default: '1. Chấp nhận Hộ khẩu Thành phố/KT3 Thành phố/Hộ khẩu tỉnh/Passport (Bản gốc) (Giữ lại khi nhận xe)\r\n2. Tài sản đặt cọc (1 trong 2 hình thức)\r\n- Xe máy (giá trị >15t) + Cà vẹt (bản gốc)\r\n- Hoặc cọc tiền mặt 15 triệu.',
    },
    requiredPapers: [{
      id: String,
      name: String,
    },
    ],
    vehicleNumber: {
      type: String,
      require,
    },
    historyContract: [
      {
        url: String,
      },
    ],
    approveVehicle: {
      type: Boolean,
      default: false,
    },
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
    conditions: [
      {
        name: String,
      },
      require],
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
