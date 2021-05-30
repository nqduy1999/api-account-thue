const mongoose = require('mongoose');

const WardSchema = mongoose.Schema({
  id: Number,
  name: String,
  district_id: Number,
});

module.exports = mongoose.model('wards', WardSchema);
