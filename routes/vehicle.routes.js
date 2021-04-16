const VehicleController = require('../controllers/vehicle.controller');
const auth = require('../middleware/auth');

const router = require("express").Router();
router.get("/type", VehicleController.getVehicleType)
router.post("/type", auth, VehicleController.createVehicleType);

router.delete("/type/:id", auth, VehicleController.deteleVehicleType);
router.put("/type/:id", auth, VehicleController.updateVehicleType);
router.get("/makes", VehicleController.getVehicleMakes)
router.post("/makes", auth, VehicleController.createVehicleMakes);

router.delete("/makes/:id", auth, VehicleController.deteleVehicleMakes);
router.put("/makes/:id", auth, VehicleController.updateVehicleMakes);
module.exports = router;