const mongoose = require('mongoose');

const OptionsModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    logo: {
      type: String,
      require,
    },
  },
);
module.exports = mongoose.model('options', OptionsModel);
