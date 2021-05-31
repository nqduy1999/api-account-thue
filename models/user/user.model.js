const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please input your name'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please input your password'],
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
      // 1 Admin, 0 user
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/clduykhang/image/upload/v1620008054/system/icons8-male-user-96_rqihbm.png',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
    address: {
      cityId: {
        type: Number,
        trim: true,
      },
      ward: { type: String },
      city: { type: String },
      district: { type: String },
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
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    GPLX: {
      code: String,
      photo: [{ type: String }],
      isActive: Boolean,
    },
    CMND: {
      code: String,
      photo: [{ type: String }],
      isActive: Boolean,
    },
    historyContract: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'contract',
    }],
    listPostsUser: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts',
    }],
    isAcceptPost: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('User', userSchema);
