const ContractModel = require('../models/contract/contract.model');
const postModel = require('../models/post/post.model');
const PostModel = require('../models/post/post.model');

const ContractController = {
  getContractsById: async (req, res) => {
    try {
      const { idOwner, idHirer } = req.body;
      const params = {
        ...idOwner ? { idOwner } : {},
        ...idHirer ? { idHirer } : {},
      };
      const contract = await ContractModel.find({ params });
      res.json(contract);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createContract: async (req, res) => {
    const { idHirer, idPost } = req.body;
    const post = await postModel.findOne({ _id: idPost });
    const newContract = new ContractModel({ idHirer, idPost, price: post.priceOption.price });
    await newContract.save();
    res.json({ msg: 'Tạo hợp đồng thành công' });
    try {
      res.json({ msg: 'Admin Resource' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteContract: async (req, res) => {
    try {
      await ContractModel.findByIdAndDelete(req.params.id);
      res.json({
        msg: 'Xoá thành công',
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  acceptContract: async (req, res) => {
    try {
      const { idOwner, idPost } = req.body;
      const param = {
        status: 2,
      };
      const paramsPost = {
        status: 1,
      };
      const contract = await ContractModel.findByIdAndUpdate({ _id: req.params.id }, param);
      await PostModel.findByIdAndUpdate({ _id: idPost }, paramsPost);
      res.json({ msg: 'Cập nhật thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = ContractController;
