const mongoose = require('mongoose');

const DistrictSchema = mongoose.Schema({
  id: Number,
  name: String,
  city_id: Number,
});

module.exports = mongoose.model('districts', DistrictSchema);
