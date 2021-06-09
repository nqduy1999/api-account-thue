/* eslint-disable consistent-return */
const ListdayModel = require('../models/post/listday.model');

const ListDayController = {
  getListByIdContract: async (req, res) => {
    try {
      const { idPost } = req.query;
      const listday = await ListdayModel.findOne({ idPost });
      res.json(listday);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = ListDayController;
