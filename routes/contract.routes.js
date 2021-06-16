const router = require('express').Router();
const ContractController = require('../controllers/contract.controller');

router.get('/', ContractController.getContracts);
router.post('/', ContractController.createContract);
router.get('/:id', ContractController.getContractById);
router.put('/accept/:id', ContractController.acceptContractById);
router.put('/reject/:id', ContractController.rejectContractById);
router.put('/confirm/:id', ContractController.confirmPayment);
router.delete('/:id', ContractController.deleteContract);
module.exports = router;
