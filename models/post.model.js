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
    tags: [
      {
        name: {
          type: String,
          trim: true
        }
      }
    ],
    address: {
      number: {
        type: String,
        trim: true
      },
      street: {
        type: String,
        trim: true,
      },
      ward: {
        type: String,
        trim: true,
      },
      district: {
        type: String,
        trim: true
      },
      city: {
        type: String,
        trim: true
      },
      province: {
        type: String,
        trim: true
      }
    },
    price: {
      type: Number,
      required: true,
      trim: true
    },
    title: {
      type: String,
      trim: true
    },
    dynamic: [
      {
        name: {
          type: String,
          trim: true
        },
        icon: {
          type: String,
          trim: true
        }
      }
    ],
    document: [
      {
        name: {
          type: String,
          trim: true
        },
        icon: {
          type: String,
          trim: true
        }
      }
    ],
    property: {
      type: String,
    },
    rules: {
      type: String,
      trim: true

    },
    image: {
      public_id: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true
      }
    },
    status: {
      type: String,
      required: true,
      default: "CHUA_THUE"
    }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('post', postModel);;