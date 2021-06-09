const router = require('express').Router();
const ListDayController = require('../controllers/datehire.controller');

router.get('/', ListDayController.getListByIdContract);

module.exports = router;
