const VehicleController = require('../controllers/vehicle.controller');
const auth = require('../middleware/auth');

const router = require("express").Router();
//Type Vehicle
router.get("/type", VehicleController.getVehicleType)
router.post("/type", VehicleController.createVehicleType);
router.delete("/type/:id", auth, VehicleController.deteleVehicleType);
router.put("/type/:id", auth, VehicleController.updateVehicleType);
// Makes Vehicle
router.get("/makes", VehicleController.getVehicleMakes)
router.post("/makes", VehicleController.createVehicleMakes);
router.delete("/makes/:id", auth, VehicleController.deteleVehicleMakes);
router.put("/makes/:id", auth, VehicleController.updateVehicleMakes);
// Model Vehicle 
router.get("/model", VehicleController.getVehicleModel)
router.post("/model", VehicleController.createVehicleModel);
router.delete("/model/:id", VehicleController.deteleVehicleModel);
router.put("/model/:id", VehicleController.updateVehicleModel);
module.exports = router;