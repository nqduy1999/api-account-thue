const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
  id: Number,
  name: String,
});

module.exports = mongoose.model('citys', CitySchema);
