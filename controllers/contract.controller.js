/* eslint-disable consistent-return */
const ContractModel = require('../models/contract/contract.model');
const { responseDataNormal } = require('../utils/response');

const ContractController = {
  getContracts: async (req, res) => {
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
    const { idHirer, idPost, idOwner } = req.body;
    const newContract = new ContractModel({ idHirer, idPost, idOwner });
    await newContract.save();
    res.json(responseDataNormal(true, newContract, null));
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
  getContractById: async (req, res) => {
    try {
      const { id } = req.params;
      const contract = await ContractModel.find({ _id: id });
      res.json(responseDataNormal(true, contract, null));
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = ContractController;
