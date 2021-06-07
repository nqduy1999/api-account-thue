/* eslint-disable consistent-return */
const PaymentModel = require('../models/payment/payment.model');
const { responseDataNormal } = require('../utils/response');

const PaymentController = {
  getPayments: async (req, res) => {
    try {
      const { idHirer, idPost } = req.body;
      const params = {
        ...idHirer ? { idHirer } : {},
        ...idPost ? { idPost } : {},
      };
      const contract = await PaymentModel.find({ params });
      res.json(contract);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    const {
      idHirer, idPost, typePayment, totalPrice,
    } = req.body;
    const newPayment = new PaymentModel({
      idHirer, idPost, typePayment, totalPrice,
    });
    await newPayment.save();
    res.json({ msg: 'Tạo hoá đơn thành công' });
    try {
      res.json({ msg: 'Admin Resource' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getPaymentById: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await PaymentModel.find({ _id: id });
      res.json(responseDataNormal(true, payment, null));
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = PaymentController;
