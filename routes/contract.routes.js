const router = require('express').Router();
const ContractController = require('../controllers/contract.controller');

router.get('/', ContractController.getContracts);
router.post('/', ContractController.createContract);
router.get('/:id', ContractController.getContractById);
router.put('/accept/:id', ContractController.acceptContractById);
router.delete('/:id', ContractController.deleteContract);
module.exports = router;
