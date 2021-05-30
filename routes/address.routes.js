const router = require('express').Router();
const addressController = require('../controllers/address.controller');

router.get('/city', addressController.findAllCity);
router.get('/ward/:id', addressController.findAllWardByDistrict);
router.get('/district/:id', addressController.findAllDistrictByCity);
module.exports = router;
