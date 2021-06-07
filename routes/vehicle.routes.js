/* eslint-disable import/order */
const VehicleController = require('../controllers/vehicle.controller');
// const auth = require('../middleware/auth');

const router = require('express').Router();
// Type Vehicle
router.get('/type', VehicleController.getVehicleTypeAll);
router.get('/type/:id', VehicleController.getVehicleType);
router.post('/type', VehicleController.createVehicleType);
router.delete('/type/:id', VehicleController.deleteVehicleType);
router.put('/type/:id', VehicleController.updateVehicleType);
// Makes Vehicle
router.get('/makes', VehicleController.getVehicleMakes);
router.get('/makes/:id', VehicleController.getVehicleMake);
router.post('/makes', VehicleController.createVehicleMakes);
router.delete('/makes/:id', VehicleController.deleteVehicleMakes);
router.put('/makes/:id', VehicleController.updateVehicleMakes);
// Model Vehicle
router.get('/model', VehicleController.getVehicleModels);
router.get('/model/:id', VehicleController.getVehicleModel);
router.post('/model', VehicleController.createVehicleModel);
router.delete('/model/:id', VehicleController.deleteVehicleModel);
router.put('/model/:id', VehicleController.updateVehicleModel);
module.exports = router;
