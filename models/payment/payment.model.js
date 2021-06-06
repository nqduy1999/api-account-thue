const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PaymentModel = new mongoose.Schema(
  {
    idOwner: {
      type: Schema.Types.ObjectId,
      require,
    },
    idPost: {
      type: Schema.Types.ObjectId,
      require,
    },
    typePayment: {
      type: String,
    },
    idHirer: {
      type: Schema.Types.ObjectId,
      require,
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,

  },
);
module.exports = mongoose.model('contract', PaymentModel);
