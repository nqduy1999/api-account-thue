const router = require('express').Router();
const ContractController = require('../controllers/contract.controller');

router.get('/', ContractController.getContracts);
router.post('/', ContractController.createContract);
router.get('/:id', ContractController.getContractById);
module.exports = router;
