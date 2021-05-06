const mongoose = require('mongoose');

const ContractModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
  },
);
module.exports = mongoose.model('options', ContractModel);
