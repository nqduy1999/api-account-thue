const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PaymentModel = new mongoose.Schema(
  {
    idContract: {
      type: Schema.Types.ObjectId,
      require,
    },
    idOwner: {
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
    taxes: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    isLate: {
      type: Boolean,
    },
  },
  {
    timestamps: true,

  },
);
module.exports = mongoose.model('contract', PaymentModel);
