/* eslint-disable consistent-return */
const OptionModel = require('../models/post/option.model');
const { responseData } = require('../utils/response');

const OptionController = {
  // Type là loại xe ví dụ xe 4 chỗ 7 chỗ bán tải
  getAllOption: async (req, res) => {
    try {
      const paginator = {
        perPage: Number(req.query.limit),
        currentPage: Number(req.query.page),
        nextPage: Number(req.query.page) + 1,
      };
      const { perPage, currentPage } = paginator;
      const { textSearch, isSearch } = req.query;
      const totalPage = Math.ceil((await OptionModel.find(isSearch ? { name: { $regex: `${textSearch}`, $options: 'i' } } : {}))
        .length / (req.query.limit || 1));
      const types = await OptionModel.find(isSearch ? { name: { $regex: `${textSearch}`, $options: 'i' } } : {})
        .limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0);
      types.sort((a, b) => a.id - b.id);
      res.json(responseData(true, types, null, { ...paginator, totalPage }));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createOption: async (req, res) => {
    const { name, logo } = req.body;
    const option = await OptionModel.findOne({ name });
    if (option) {
      return res.status(400).json({ msg: 'Trùng tên' });
    }
    const newOption = new OptionModel({ name, logo });
    await newOption.save();
    res.json({ msg: 'Tạo option thành công' });
    try {
      res.json({ msg: 'Admin Resource' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteOption: async (req, res) => {
    try {
      await OptionModel.findByIdAndDelete(req.params.id);
      res.json({
        msg: 'Xoá thành công',
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateOption: async (req, res) => {
    try {
      const { name, logo } = req.body;
      const param = {
        name, logo,
      };
      await OptionModel.findByIdAndUpdate({ _id: req.params.id }, param);
      res.json({ msg: 'Cập nhật loại thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = OptionController;
