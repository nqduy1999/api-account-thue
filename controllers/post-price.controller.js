const PostPriceModel = require('../models/post-price.model');

const PostPriceController = {
  getPostPrices: async (req, res) => {
    try {
      const options = await PostPriceModel.find();
      res.json(options);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createPostPrice: async (req, res) => {
    const {
      day, price, isHire, idPost,
    } = req.body;
    const newOption = new PostPriceModel({
      day, price, isHire, idPost,
    });
    await newOption.save();
    res.json({ msg: 'Tạo thành công' });
    try {
      res.json({ msg: 'Admin Resource' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deletePostPrice: async (req, res) => {
    try {
      await PostPriceModel.findByIdAndDelete(req.params.id);
      res.json({
        msg: 'Xoá thành công',
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updatePostPrice: async (req, res) => {
    try {
      const { day, price, isHire } = req.body;
      const param = {
        day, price, isHire,
      };
      await PostPriceModel.findByIdAndUpdate({ _id: req.params.id }, param);
      res.json({ msg: 'Cập nhật thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = PostPriceController;
