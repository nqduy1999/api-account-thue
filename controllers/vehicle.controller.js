const vehicleMakeModel = require("../models/vehicle.make.model");
const vehicleTypeModel = require("../models/vehicle.type.model");
const makeid = require("../utils/generateId");

const VehicleController = {
    getVehicleType: async (req, res) => {
        try {
            let categories = await vehicleTypeModel.find();
            categories.sort(function (a, b) { return a.id - b.id })
            res.json(categories);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    createVehicleType: async (req, res) => {
        const { id, name, logo } = req.body;
        const category = await vehicleTypeModel.findOne({ name: name });
        if (category) {
            res.status(400).json({ msg: "Trùng tên" });
            return;
        }
        const newCategory = new vehicleTypeModel({ id, name, logo });
        await newCategory.save();
        res.json({ msg: "Tạo loại xe thành công" });
        try {
            res.json({ msg: "Admin Resource" });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deteleVehicleType: async (req, res) => {
        try {
            await vehicleTypeModel.findByIdAndDelete(req.params.id);
            res.json({
                msg: "Delete Sucessful"
            })
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    updateVehicleType: async (req, res) => {
        try {
            const { name } = req.body;
            const param = {
                name
            }
            await vehicleTypeModel.findByIdAndUpdate({ _id: req.params.id }, param);
            res.json({ msg: "Update Sucessfully" })
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getVehicleMakes: async (req, res) => {
        try {
            const categories = await vehicleMakeModel.find();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    createVehicleMakes: async (req, res) => {
        const { name, logo } = req.body;
        const id = makeid();
        const category = await vehicleMakeModel.findOne({ name: name });
        if (category) {
            res.status(400).json({ msg: "Trùng tên" });
            return;
        }
        const newCategory = new vehicleTypeModel({ id, name, logo });
        await newCategory.save();
        res.json({ msg: "sucesss" });
        try {
            res.json({ msg: "Admin Resource" });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deteleVehicleMakes: async (req, res) => {
        try {
            await vehicleMakeModel.findByIdAndDelete(req.params.id);
            res.json({
                msg: "Delete Sucessful"
            })
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    updateVehicleMakes: async (req, res) => {
        try {
            const { name } = req.body;
            const param = {
                name
            }
            await vehicleMakeModel.findByIdAndUpdate({ _id: req.params.id }, param);
            res.json({ msg: "Update Sucessfully" })
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}
module.exports = VehicleController;