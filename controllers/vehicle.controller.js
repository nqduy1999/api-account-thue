const vehicleMake = require('../models/vehicle.make.model');
const vehicleType = require('../models/vehicle.type.model');
const vehicleModel = require('../models/vehicle.model.model');
const responseData = require('../utils/response');

const VehicleController = {
  // Type là loại xe ví dụ xe 4 chỗ 7 chỗ bán tải
  getVehicleType: async (req, res) => {
    try {
      const categories = await vehicleType.find();
      categories.sort((a, b) => a.id - b.id);
      res.json(categories);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createVehicleType: async (req, res) => {
    const { name, logo } = req.body;
    const category = await vehicleType.findOne({ name });
    if (category) {
      res.status(400).json({ msg: 'Trùng tên' });
      return;
    }
    const newCategory = new vehicleType({ name, logo });
    await newCategory.save();
    res.json({ msg: 'Tạo loại xe thành công' });
    try {
      res.json({ msg: 'Admin Resource' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteVehicleType: async (req, res) => {
    try {
      await vehicleType.findByIdAndDelete(req.params.id);
      res.json({
        msg: 'Xoá thành công',
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateVehicleType: async (req, res) => {
    try {
      const { name, logo, key } = req.body;
      const param = {
        name, logo, key,
      };
      await vehicleType.findByIdAndUpdate({ _id: req.params.id }, param);
      res.json({ msg: 'Cập nhật loại thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // Makes là hãng xe vd Toyota, Mercedes
  getVehicleMakes: async (req, res) => {
    try {
      const makes = await vehicleMake.find();
      res.json(makes);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createVehicleMakes: async (req, res) => {
    const { name, logo } = req.body;
    const make = await vehicleMake.findOne({ name });
    if (make) {
      res.status(400).json({ msg: 'Đã có tên này' });
      return;
    }
    const newCategory = new vehicleMake({ name, logo });
    await newCategory.save();
    res.json({ msg: 'Tạo hãng xe thành công ' });
    try {
      res.json({ msg: 'Quyền Admin' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteVehicleMakes: async (req, res) => {
    try {
      await vehicleMake.findByIdAndDelete(req.params.id);
      res.json({
        msg: 'Xoá hãng xe thành công',
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateVehicleMakes: async (req, res) => {
    try {
      const { name, logo } = req.body;
      const param = {
        name,
        logo,
      };
      await vehicleMake.findByIdAndUpdate({ _id: req.params.id }, param);
      res.json({ msg: 'Cập nhật hãng xe thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // Model là loại xe trong mẫu xe
  getVehicleModel: async (req, res) => {
    const { typeId, makesId } = req.query;
    let params;
    try {
      if (!typeId && !makesId) {
        params = {};
      }
      if (typeId && makesId) {
        params = { typeId, makesId };
      }
      if (typeId && !makesId) {
        params = { typeId };
      }
      if (!typeId && makesId) {
        params = { makesId };
      }
      const models = await vehicleModel.find(params);
      res.json(responseData(true, models, null));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createVehicleModel: async (req, res) => {
    try {
      const {
        name, logo, typeId, makesId,
      } = req.body;
      const model = await vehicleModel.findOne({ name });
      const type = await vehicleType.findById(typeId);
      const make = await vehicleMake.findById(makesId);
      if (!type) {
        res.status(400).json(responseData(false, [], 'Không tồn tại kiểu xe'));
        return;
      }
      if (!make) {
        res.status(400).json(responseData(false, [], 'Không tồn tại hãng xe'));
        return;
      }
      if (model) {
        res.status(400).json(responseData(false, [], 'Trùng tên'));
        return;
      }
      const newModel = new vehicleModel({
        typeId, makesId, name, logo,
      });
      await newModel.save();
      res.json(responseData(true, [], 'Tạo thành công'));
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.message });
    }
  },
  deleteVehicleModel: async (req, res) => {
    try {
      await vehicleModel.findByIdAndDelete(req.params.id);
      res.json({
        msg: 'Delete Sucessful',
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateVehicleModel: async (req, res) => {
    try {
      const { name, logo } = req.body;
      const param = {
        name,
        logo,
      };
      await vehicleModel.findByIdAndUpdate({ _id: req.params.id }, param);
      res.json({ msg: 'Update Sucessfully' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = VehicleController;
