/* eslint-disable consistent-return */
const AddressModel = require('../models/address.model');

const AddressController = {
  ImportAddress: async (req, res) => {
    try {
      const { data } = req.body;
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = AddressController;
