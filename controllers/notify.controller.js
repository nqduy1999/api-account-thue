/* eslint-disable new-cap */
const NotifyModel = require('../models/notify.model');

const RequestController = {
  getAllNotifyUser: async (req, res) => {
    try {
      const { idUser } = req.body;
      const require = await NotifyModel.find({ idUser });
      res.json(require);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = RequestController;
