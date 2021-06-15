const mongoose = require('mongoose');

const OptionsModel = new mongoose.Schema(
  {
    idContract: {
      type: String,
      require,
    },
    idUser: {
      type: String,
      require,
    },
    comment: String,
  },
);
module.exports = mongoose.model('options', OptionsModel);
