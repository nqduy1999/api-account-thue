const mongoose = require('mongoose');

const RatingModel = new mongoose.Schema(
  {
    idContract: {
      type: String,
      require,
    },
    idUser: {
      type: String,
      require,
    },
    idPost: {
      type: String,
      require,
    },
    value: {
      Number,
    },
    comment: String,
  },
);
module.exports = mongoose.model('rating', RatingModel);
