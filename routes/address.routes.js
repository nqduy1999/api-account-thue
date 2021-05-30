const router = require('express').Router();
const addressController = require('../controllers/address.controller');

router.get('/city', addressController.findAllCity);
router.get('/district/:id', addressController.findAllDistrictByCity);
router.get('/ward/:id', addressController.findAllWardByDistrict);
module.exports = router;
