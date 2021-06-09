/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const ContractModel = require('../models/contract/contract.model');
const PaymentModel = require('../models/payment/payment.model');
const ListdayModel = require('../models/post/listday.model');
const PostModel = require('../models/post/post.model');
const { responseDataNormal } = require('../utils/response');

const ContractController = {
  getContracts: async (req, res) => {
    try {
      const { idOwner, idHirer, status } = req.query;
      const params = {
        ...idOwner ? { idOwner } : {},
        ...idHirer ? { idHirer } : {},
        ...status ? { status } : {},
      };
      const contract = await ContractModel.find(params);
      res.json(responseDataNormal(true, contract, null));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createContract: async (req, res) => {
    const {
      idHirer, idPost, idOwner, endDate, startDate,
    } = req.body;

    const newContract = new ContractModel({
      idHirer, idPost, idOwner, endDate, startDate,
    });
    await PostModel.findByIdAndUpdate({ _id: idPost }, { status: 2 });
    await ListdayModel.findOneAndUpdate({ idPost }, { listDay: { startDate, endDate } });
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
      const paymentFind = await PaymentModel.findOne({ idContract: req.params.id });
      await PostModel.findOneAndUpdate({ _id: paymentFind?.idPost }, { status: 0 });
      await PaymentModel.findByIdAndDelete({ _id: paymentFind?._id });
      await ContractModel.findByIdAndDelete(req.params.id);
      res.json({
        code: 1,
        msg: 'Xoá thành công',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
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
  acceptContractById: async (req, res) => {
    try {
      const { id } = req.params;
      const contractFind = await ContractModel.findById({ _id: id });
      await PostModel.findByIdAndUpdate({ _id: contractFind.idPost }, { status: 1 });
      await ContractModel.findByIdAndUpdate({ _id: id }, { status: 2 });
      res.json({ code: 1, msg: 'Chấp nhận hợp đồng ' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = ContractController;
