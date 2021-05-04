const mongoose = require('mongoose');

const RequirePapersModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require
    },
    logo: {
      type: String,
      require
    },
  }
)
module.exports = mongoose.model('requirePapers', RequirePapersModel);