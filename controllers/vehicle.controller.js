/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable new-cap */
const vehicleMake = require('../models/vehicle/vehicle.make.model');
const vehicleType = require('../models/vehicle/vehicle.type.model');
const vehicleModel = require('../models/vehicle/vehicle.model.model');
const { responseData, responseDataNormal } = require('../utils/response');

const VehicleController = {
  // Type là loại xe ví dụ xe 4 chỗ 7 chỗ bán tải
  getVehicleTypeAll: async (req, res) => {
    try {
      const categories = await vehicleType.find();
      categories.sort((a, b) => a.id - b.id);
      res.json(categories);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createVehicleType: async (req, res) => {
    const { name, logo, seat } = req.body;
    const category = await vehicleType.findOne({ name });
    if (category) {
      return res.status(400).json({ msg: 'Trùng tên' });
    }
    const newCategory = new vehicleType({ name, logo, seat });
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
      const { name, logo, seat } = req.body;
      const param = {
        name, logo, seat,
      };
      await vehicleType.findByIdAndUpdate({ _id: req.params.id }, param);
      res.json({ msg: 'Cập nhật loại thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getVehicleType: async (req, res) => {
    try {
      const vehicle = await vehicleType.findById({ _id: req.params.id });
      res.json(responseDataNormal(true, vehicle, ''));
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
      const { textSearch, isSearch } = req.query;
      const totalPage = Math.ceil((await vehicleMake.find(isSearch ? { name: { $regex: `${textSearch}`, $options: 'i' } } : {}))
        .length / (req.query.limit || 1));
      const makes = await vehicleMake.find(isSearch ? { name: { $regex: `${textSearch}`, $options: 'i' } } : {})
        .limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0).select('-password');

      res.json(responseData(true, makes, null, { ...paginator, totalPage }));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createVehicleMakes: async (req, res) => {
    const { name, logo, isLuxury } = req.body;
    const make = await vehicleMake.findOne({ name });
    if (make) {
      return res.status(400).json({ msg: 'Đã có tên này' });
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
      const vehicleFind = await vehicleMake.findById(req.params.id);
      if (vehicleFind.model.length > 0) {
        return res.status(400).json({ msg: 'Không thể xoá các vì hãng xe có mẫu xe tồn tại' });
      }
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
      const { name, logo, isLuxury } = req.body;
      const param = {
        name,
        logo,
        isLuxury,
      };
      await vehicleMake.findByIdAndUpdate({ _id: req.params.id }, param);
      res.json({ msg: 'Cập nhật hãng xe thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getVehicleMake: async (req, res) => {
    try {
      const vehicle = await vehicleMake.findById({ _id: req.params.id });
      res.json(responseDataNormal(true, vehicle, ''));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // Model là loại xe trong mẫu xe
  getVehicleModels: async (req, res) => {
    const {
      typeId, makesId, textSearch, isSearch,
    } = req.query;
    const paginator = {
      perPage: Number(req.query.limit),
      currentPage: Number(req.query.page),
      nextPage: Number(req.query.page) + 1,
    };
    const { perPage, currentPage } = paginator;
    try {
      const params = {
        ...typeId ? { typeId } : {},
        ...makesId ? { makesId } : {},
      };
      const totalPage = Math.ceil((await vehicleModel.find(isSearch ? { ...params, name: { $regex: `${textSearch}`, $options: 'i' } } : { ...params })).length / (req.query.limit || 1));
      const models = await vehicleModel
        .find(isSearch ? { ...params, name: { $regex: `${textSearch}`, $options: 'i' } } : { ...params })
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
      const vehicleTypeFind = await vehicleType.findOne({ _id: typeId });
      const vehicleMakeFind = await vehicleMake.findOne({ _id: makesId });
      const modelType = vehicleTypeFind.model;
      const modelMake = vehicleMakeFind.model;
      if (model) {
        return res.status(400).json(responseData(false, [], 'Trùng tên'));
      }
      const newModel = new vehicleModel({
        typeId, makesId, name, logo,
      });
      await newModel.save();
      await vehicleType.findByIdAndUpdate({ _id: typeId },
        { model: modelType.concat(newModel._id) });
      await vehicleMake.findByIdAndUpdate({ _id: makesId },
        { model: modelMake.concat(newModel._id) });
      res.json(responseData(true, [], 'Tạo thành công'));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteVehicleModel: async (req, res) => {
    try {
      const vehicleFind = await vehicleModel.findById(req.params.id);
      const vehicleTypeFind = await vehicleType.findById({ _id: vehicleFind.typeId });
      const vehicleMakeFind = await vehicleMake.findById({ _id: vehicleFind.makesId });
      const arrModelType = vehicleTypeFind.model.filter((item) => item !== req.params.id);
      const arrModelMakes = vehicleMakeFind.model.filter((item) => item !== req.params.id);
      await vehicleType.findByIdAndUpdate({ _id: vehicleFind.typeId }, { ...vehicleTypeFind, model: arrModelType });
      await vehicleMake.findByIdAndUpdate({ _id: vehicleFind.makesId }, { ...vehicleMakeFind, model: arrModelMakes });
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
  getVehicleModel: async (req, res) => {
    try {
      const vehicle = await vehicleModel.findById({ _id: req.params.id });
      res.json(responseDataNormal(true, vehicle, ''));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = VehicleController;
