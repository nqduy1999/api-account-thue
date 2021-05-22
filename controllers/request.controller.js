/* eslint-disable new-cap */
const RequestModel = require('../models/request.model');

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
      const { type, status, images } = req.body;
      const newRequest = new RequestModel({ type, status, images });
      await newRequest.save();
      res.json({ msg: 'Gửi request thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateRequest: async (req, res) => {
    console.log(req.params.id);
    // try {
    //   await RequestModel.findByIdAndUpdate(req.params.id);
    //   res.json({
    //     msg: 'Xoá thành công',
    //   });
    // } catch (err) {
    //   res.status(500).json({ msg: err.message });
    // }
  },
};
module.exports = RequestController;
