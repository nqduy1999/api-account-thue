const PaymentModel = require('../models/payment/payment.model');
const postModel = require('../models/post/post.model');

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
    const { idHirer, idPost, idOwner } = req.body;
    const newPayment = new PaymentModel({ idHirer, idPost, idOwner });
    await newPayment.save();
    res.json({ msg: 'Thanh toán thành công' });
    try {
      res.json({ msg: 'Admin Resource' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // deletePayment: async (req, res) => {
  //   try {
  //     await ContractModel.findByIdAndDelete(req.params.id);
  //     res.json({
  //       msg: 'Xoá thành công',
  //     });
  //   } catch (err) {
  //     res.status(500).json({ msg: err.message });
  //   }
  // },
};
module.exports = ContractController;
