const OptionModel = require('../models/post/option.model');

const OptionsController = {
  getOptions: async (req, res) => {
    try {
      const options = await OptionModel.find();
      res.json(options);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createOption: async (req, res) => {
    const { name, logo } = req.body;
    const newOption = new OptionModel({ name, logo });
    await newOption.save();
    res.json({ msg: 'Tạo thành công' });
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
      res.json({ msg: 'Cập nhật thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = OptionsController;
