/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable new-cap */
const vehicleMake = require('../models/vehicle.make.model');
const vehicleType = require('../models/vehicle.type.model');
const vehicleModel = require('../models/vehicle.model.model');
const { responseData } = require('../utils/response');

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
    const paginator = {
      perPage: Number(req.query.limit),
      currentPage: Number(req.query.page),
      nextPage: Number(req.query.page) + 1,
    };
    const { perPage, currentPage } = paginator;
    try {
      const totalPage = Math.ceil((await vehicleMake.find()).length / (req.query.limit || 1));
      const makes = await vehicleMake.find().limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0).select('-password');

      res.json(responseData(true, makes, null, { ...paginator, totalPage }));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createVehicleMakes: async (req, res) => {
    const { name, logo, isLuxury } = req.body;
    const make = await vehicleMake.findOne({ name });
    if (make) {
      res.status(400).json({ msg: 'Đã có tên này' });
      return;
    }
    const params = {
      ...name ? { name } : {},
      ...logo ? { logo } : {},
      ...isLuxury ? { isLuxury } : {},
    };
    const newCategory = new vehicleMake(params);
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
    const paginator = {
      perPage: Number(req.query.limit),
      currentPage: Number(req.query.page),
      nextPage: Number(req.query.page) + 1,
    };
    const { perPage, currentPage } = paginator;
    try {
      const { textSearch, isSearch } = req.query;
      const totalPage = Math.ceil((await vehicleModel.find()).length / (req.query.limit || 1));
      const params = {
        ...typeId ? { typeId } : {},
        ...makesId ? { makesId } : {},
      };
      const models = await
        vehicleModel.find(isSearch ? { ...params, name: { $regex: `${textSearch}`, $options: 'i' } } : { ...params })
          .limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0).select('-password');
      res.json(responseData(true, models, null, { ...paginator, totalPage }));
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
      if (model) {
        res.status(400).json(responseData(false, [], 'Trùng tên'));
        return;
      }
      const newModel = new vehicleModel({
        typeId, makesId, name, logo,
      });
      await newModel.save();
      await vehicleType.findByIdAndUpdate({ _id: typeId }, { model: newModel._id });
      await vehicleMake.findByIdAndUpdate({ _id: makesId }, { model: newModel._id });
      res.json(responseData(true, [], 'Tạo thành công'));
    } catch (err) {
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
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = VehicleController;
