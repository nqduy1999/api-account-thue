const PaymentModel = require('../models/payment/payment.model');

const ContractController = {
  getPayments: async (req, res) => {
    try {
      const { idOwner, idHirer } = req.body;
      const params = {
        ...idOwner ? { idOwner } : {},
        ...idHirer ? { idHirer } : {},
      };
      const contract = await PaymentModel.find({ params });
      res.json(contract);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    const {
      idHirer, idPost, idOwner, typePayment, totalPrice,
    } = req.body;
    const newPayment = new PaymentModel({
      idHirer, idPost, idOwner, typePayment, totalPrice,
    });
    await newPayment.save();
    res.json({ msg: 'Tạo hoá đơn thành công' });
    try {
      res.json({ msg: 'Admin Resource' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = ContractController;
