const router = require('express').Router();
const PaymentController = require('../controllers/payment.controller');

router.get('/', PaymentController.getPayments);
router.post('/', PaymentController.createPayment);
router.get('/:id', PaymentController.getPaymentById);
module.exports = router;
