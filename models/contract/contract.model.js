const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ContractModel = new mongoose.Schema(
  {
    idPost: {
      type: Schema.Types.ObjectId,
      require,
    },
    idOwner: {
      type: Schema.Types.ObjectId,
      require,
    },
    idHirer: {
      type: Schema.Types.ObjectId,
      require,
    },
    price: {
      type: Number,
    },
    depositFee: {
      price: {
        String: Number,
      },
      isActive: Boolean,
    },
    status: {
      type: Number,
      default: 1,
    },
    dateHire: {
      type: Date,
      require,
    },
    dateReturn: {
      type: Date,
      require,
    },
  },
  {
    timestamps: true,

  },
);
module.exports = mongoose.model('contract', ContractModel);
