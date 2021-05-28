/* eslint-disable new-cap */
const RequestModel = require('../models/request.model');
const UserModel = require('../models/user/user.model');

const RequestController = {
  getRequest: async (req, res) => {
    try {
      const require = await RequestModel.find({ status: 'PENDING' });
      res.json(require);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createRequest: async (req, res) => {
    try {
      const {
        type, status, images, idUser,
      } = req.body;
      const newRequest = new RequestModel({
        type, status, images, idUser,
      });
      await newRequest.save();
      res.json({ msg: 'Gửi request thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateRequest: async (req, res) => {
    try {
      const {
        type, identification, passport, licenseDrive,
      } = req.body;
      const request = await RequestModel.findByIdAndUpdate(req.params.id, { type });
      await UserModel.findByIdAndUpdate(request.idUser, {
        ...identification ? { identification } : {},
        ...passport ? { passport } : {},
        ...licenseDrive ? { licenseDrive } : {},
      });
      res.json(request);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = RequestController;
