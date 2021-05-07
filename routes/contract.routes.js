const router = require('express').Router();
const ContractController = require('../controllers/contract.controller');

router.post('/', ContractController.createContract);
router.post('/accept-contract', ContractController.acceptContract);
module.exports = router;
