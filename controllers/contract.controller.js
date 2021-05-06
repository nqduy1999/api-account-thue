const ContractModel = require('../models/contract.model');

const OptionsController = {
  getContractsByIdOwner: async (req, res) => {
    try {
      const options = await ContractModel.find();
      res.json(options);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createContract: async (req, res) => {
    const { idOwner, idHirer } = req.body;
    const newContract = new ContractModel({ idOwner, idHirer });
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
  updateOption: async (req, res) => {
    try {
      const { name, logo } = req.body;
      const param = {
        name, logo,
      };
      await ContractModel.findByIdAndUpdate({ _id: req.params.id }, param);
      res.json({ msg: 'Cập nhật thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = OptionsController;
