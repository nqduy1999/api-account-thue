const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ContractModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
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
    reasonReject: {
      type: String,
    },
    isRating: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,

  },
);
module.exports = mongoose.model('contract', ContractModel);
