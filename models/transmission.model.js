const mongoose = require('mongoose');

const TransmissionModel = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "CMND và GPLX (đối chiếu)",
    },
  }
)
module.exports = mongoose.model('transmission', TransmissionModel);