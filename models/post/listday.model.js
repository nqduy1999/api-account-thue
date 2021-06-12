const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ListDaySchema = new mongoose.Schema(
  {
    listDay: [{ startDate: Date, endDate: Date }],
    idPost: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    },
  },
);
module.exports = mongoose.model('ListDay', ListDaySchema);
