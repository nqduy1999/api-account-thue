/* eslint-disable import/no-unresolved */
const NotifyModel = require('../models/notify.model');

const NotifyController = {
  getAllNotifyUser: async (req, res) => {
    try {
      const { idUser } = req.body;
      const require = await NotifyModel.find({ idUser });
      res.json(require);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createNotify: async (req, res) => {
    try {
      const {
        idUser, description, type, status,
      } = req.body;
      const notify = new NotifyModel({
        idUser, description, type, status,
      });
      notify.save();
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = NotifyController;
