const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const addressSchema = new Schema(
  {
    city: [{ id: String, name: String }],
    districts: [{ id: String, name: String }],
    ward: [{ id: String, name: String }],

  }, { _id: false },
);
module.exports = mongoose.model('Address', addressSchema);
