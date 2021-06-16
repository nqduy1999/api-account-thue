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
    idOwner: {
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
    startDate: {
      type: Date,
      require,
    },
    endDate: {
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
    isDead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,

  },
);
module.exports = mongoose.model('payment', PaymentModel);
