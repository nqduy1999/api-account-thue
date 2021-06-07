const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PaymentModel = new mongoose.Schema(
  {
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
    idContract: {
      type: Schema.Types.ObjectId,
    },
    dateHire: {
      type: Date,
      require,
    },
    dateReturn: {
      type: Date,
      require,
    },
    status: {
      type: Number,
      default: 1,
    },
    isLate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,

  },
);
module.exports = mongoose.model('payment', PaymentModel);
