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
      type: Number,// 1: Xe đang được thuê, 2: Xe trống, 3: Gửi xác nhận cho chủ xe.
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
    totalTrips: {
      type: Number,
      default: 0
    },
    isDriver: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      default: "1. Chấp nhận Hộ khẩu Thành phố/KT3 Thành phố/Hộ khẩu tỉnh/Passport (Bản gốc) (Giữ lại khi nhận xe)\r\n2. Tài sản đặt cọc (1 trong 2 hình thức)\r\n- Xe máy (giá trị >15t) + Cà vẹt (bản gốc)\r\n- Hoặc cọc tiền mặt 15 triệu."
    },
    requiredPapers: [{
      name: {
        type: String,
        default: "CMND và GPLX (đối chiếu)",
      },
      logo: {
        type: String,
        default: "https://res.cloudinary.com/clduykhang/image/upload/v1619962419/system/icon_cmnd_auwbor.png"
      }
    }
    ],
    vehicleNumber: {
      type: String
    },
    approveVehicle: {
      type: Boolean,
      default: false
    },
    priceSummary: {
    }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('post', postModel);