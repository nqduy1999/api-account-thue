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
      required: [true, 'Please input your email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please input your password'],
      trim: true,
    },
    role: {
      type: Number,
      default: 0
      // 1 Admin, 0 user
    },
    avatar: {
      type: String,
      default:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FobiRmR_1240-x-1240-0-avatar-profile-icon-png%2F&psig=AOvVaw0lNf_V8h0wZD-LcPRBECUm&ust=1614417286336000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjw76ebh-8CFQAAAAAdAAAAABAD',
    },
    isActive: {
      type: Boolean,
      default: false
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
    location: [{
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
    ],
    emailVerified: {
      type: Boolean,
    },
    phone: {
      type: Number,
      require
    },
    phoneVerified: {
      type: Boolean
    }
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('User', userSchema);
