const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    licenseDrive: [
      {
        type: String,
      },
    ],
    approveLicense: {
      type: Boolean,
      default: false,
    },
    passport: [{
      type: String,
    }],
    approvePassport: {
      type: Boolean,
      default: false,
    },
    identification: [{
      type: String,
    }],
    approveIdentification: {
      type: Boolean,
      default: false,
    },
  },
);
module.exports = mongoose.model('licenseUser', LicenseSchema);
