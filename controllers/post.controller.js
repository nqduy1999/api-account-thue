/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable max-len */
const PostModel = require('../models/post.model');
const userModel = require('../models/user.model');
const responseData = require('../utils/response');

const dataResponse = {
  name: 1,
  photos: 2,
  locationAddr: 3,
  priceOption: 4,
  photosVerified: 5,
  rating: 6,
  totalTrips: 7,
  transmission: 8,
};
const postController = {

  createPost: async (req, res) => {
    try {
      const {
        name, seat, status, idOwner, idModel, idMake, idType, location,
        priceOption, locationAddr, rating, photos, photosVerified, isDriver, vehicleNumber,
        note, requiredPapers, paperOfCar, totalTrips, transmission,
      } = req.body;
      const userFind = await userModel.findById({ _id: idOwner });
      if (!userFind) return res.status(400).json({ msg: 'User không tồn tại ' });
      const newPost = new PostModel({
        name,
        seat,
        status,
        idOwner,
        idModel,
        idMake,
        idType,
        location,
        priceOption,
        locationAddr,
        rating,
        photos,
        photosVerified,
        isDriver,
        vehicleNumber,
        note,
        requiredPapers,
        paperOfCar,
        totalTrips,
        transmission,
      });
      await newPost.save();
      res.json({ msg: 'Tạo post thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllPostFree: async (req, res) => {
    try {
      const {
        page, limit, transmission, idModel, idMake, idType,
      } = req.query;
      const pagination = {
        perPage: Number(limit),
        currentPage: Number(page),
        nextPage: Number(page) + 1,
      };
      const { perPage, currentPage } = pagination;
      const params = {
        status: 2,
        isDriver: false,
        ...transmission ? [{ 'transmission.id': transmission }] : {},
        ...idModel ? { idModel } : {},
        ...idMake ? { idMake } : {},
        ...idType ? { idType } : {}
      };
      const totalPage = Math.ceil(await (await PostModel.find(params)).length / (limit || 1));
      // eslint-disable-next-line consistent-return
      const posts = await PostModel.find(params, dataResponse, (err) => {
        if (err) return next(err);
      }).limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0);
      res.json(responseData(true, posts, null,
        { ...pagination, totalPage }));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const {
        // eslint-disable-next-line max-len
        name, seat, status, idOwner, idModel, idMake, idType, location, price, locationAddr, rating, photos, photosVerified, transmission,
      } = req.body;
      await PostModel.findByIdAndUpdate({ _id: req.params.id }, {
        name, seat, status, idOwner, idModel, idMake, idType, location, price, locationAddr, rating, photos, photosVerified, transmission,
      });
      res.json({ msg: 'Update Successful' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // eslint-disable-next-line consistent-return
  deletePost: async (req, res) => {
    try {
      const { idOwner } = req.body;
      const postFind = await PostModel.findOne({ idOwner });
      if (postFind === req.params.id) {
        await PostModel.findByIdAndDelete(req.params.id);
        return res.json({ msg: 'Delete Successful' });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getListPostByIdUser: async (req, res) => {
    const { page, limit } = req.query;
    const pagination = {
      perPage: Number(limit),
      currentPage: Number(page),
      nextPage: Number(page) + 1,
    };
    const { perPage, currentPage } = pagination;
    try {
      const totalPage = Math.ceil(await (await PostModel.find({ idOwner: req.params.id })).length / (limit || 1));
      const posts = await PostModel.find({ idOwner: req.params.id }).limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0);
      res.json(responseData(true, posts, null, { ...pagination, totalPage }));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postController;
