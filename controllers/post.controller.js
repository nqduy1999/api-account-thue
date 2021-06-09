/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable max-len */
const PostModel = require('../models/post/post.model');
const UserModel = require('../models/user/user.model');
const vehicleType = require('../models/vehicle/vehicle.type.model');
const { responseData, responseDataNormal } = require('../utils/response');

const dataResponse = {
  name: 1,
  photos: 2,
  address: 3,
  priceOption: 4,
  photosVerified: 5,
  rating: 6,
  historyContract: 7,
  transmission: 8,
  price: 9,
  typePost: 10,
};
const postController = {

  createPost: async (req, res) => {
    try {
      const {
        name, status, idOwner, idModel, idMake, idType, address,
        photos, isDriver, vehicleNumber, options, transmission, description, rule, price, isActive, typePost
      } = req.body;
      const userFind = await UserModel.findOne({ _id: idOwner });
      const typeVehicle = await vehicleType.findById({ _id: idType });
      const { listPostsUser } = userFind;
      const newPost = new PostModel({
        name,
        seat: typeVehicle.seat,
        status,
        idOwner,
        idModel,
        idMake,
        idType,
        address,
        price,
        photos,
        isDriver,
        vehicleNumber,
        options,
        transmission,
        description,
        rule,
        isActive,
        typePost,
      });
      await newPost.save();
      await UserModel.findByIdAndUpdate({ _id: idOwner }, {
        listPostsUser: listPostsUser.concat(newPost._id)
      });
      res.json({ msg: 'Tạo post thành công' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllPostFree: async (req, res) => {
    try {
      const {
        page, limit, transmission, idModel, idMake, idType, price, typePost, status, dateHire
      } = req.query;
      const pagination = {
        perPage: Number(limit),
        currentPage: Number(page),
        nextPage: Number(page) + 1,
      };
      const { perPage, currentPage } = pagination;
      const params = {
        isActive: true,
        ...transmission ? { 'transmission.id': transmission } : {},
        ...idModel ? { idModel } : {},
        ...idMake ? { idMake } : {},
        ...idType ? { idType } : {},
        ...price ? { price } : {},
        ...typePost ? { typePost } : {},
        ...status ? { status } : {},
      };
      const totalPage = Math.ceil((await PostModel.find(params)).length / (limit || 1));
      // eslint-disable-next-line consistent-return
      const posts = await PostModel.find(params, dataResponse, (err) => {
        if (err) return next(err);
      }).limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0);
      const postFinal = posts.filter((item) => console.log(item.listDate.filter((date) => date === dateHire)));
      res.json(responseData(true, posts, null,
        { ...pagination, totalPage }));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllPostAdmin: async (req, res) => {
    try {
      const {
        page, limit, idModel, idMake, idType,
      } = req.query;
      const pagination = {
        perPage: Number(limit),
        currentPage: Number(page),
        nextPage: Number(page) + 1,
      };
      const { perPage, currentPage } = pagination;
      const params = {
        ...idModel ? { idModel } : {},
        ...idMake ? { idMake } : {},
        ...idType ? { idType } : {}
      };
      const totalPage = Math.ceil((await PostModel.find(params)).length / (limit || 1));
      // eslint-disable-next-line consistent-return
      const posts = await PostModel.find(params).limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0);
      res.json(responseData(true, posts, null,
        { ...pagination, totalPage }));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getDetailPost: async (req, res) => {
    try {
      const post = await PostModel.findOne({ _id: req.params.id });
      if (post) {
        res.json(responseData(true, post, 'Success'));
      }
      if (!post) {
        res.json(responseData(false, null, 'Khong tim thay'));
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const {
        // eslint-disable-next-line max-len
        name, seat, status, idOwner, idModel, idMake, idType, location,
        locationAddr, rating, photos, photosVerified, transmission, priceOption,
        description, vehicleNumber, isActive,
        rule,
      } = req.body;
      await PostModel.findByIdAndUpdate({ _id: req.params.id }, {
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
        transmission,
        description,
        vehicleNumber,
        rule,
        isActive
      });
      res.json({ msg: 'Update Successful' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // eslint-disable-next-line consistent-return
  deletePost: async (req, res) => {
    try {
      const postFind = await PostModel.findById(req.params.id);
      if (postFind?.status !== 0) return res.status(400).json({ msg: 'Không thể xoá xe có trạng thái khác' });
      await PostModel.findByIdAndDelete(req.params.id);
      return res.json({ msg: 'Delete Successful' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getListPostByIdUser: async (req, res) => {
    try {
      const foundUser = await PostModel.find({ idOwner: req.params.id }).populate('User');
      res.json(responseDataNormal(true, foundUser, 'ok'));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // Post Admin
  updatePostAdmin: async (req, res) => {
    try {
      const {
        // eslint-disable-next-line max-len
        name, seat, status, idOwner, idModel, idMake, idType, location,
        locationAddr, rating, photos, photosVerified, transmission, priceOption,
        description, isActive, vehicleNumber,
        rule,
      } = req.body;
      await PostModel.findByIdAndUpdate({ _id: req.params.id }, {
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
        transmission,
        description,
        rule,
        isActive,
        vehicleNumber
      });
      res.json({ msg: 'Update Successful' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // eslint-disable-next-line consistent-return
  deletePostAdmin: async (req, res) => {
    try {
      const postFind = await PostModel.findById(req.params.id);
      if (postFind?.status !== 0) return res.status(400).json({ msg: 'Không thể xoá xe có trạng thái khác' });
      await PostModel.findByIdAndDelete(req.params.id);
      return res.json({ msg: 'Delete Successful' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postController;
