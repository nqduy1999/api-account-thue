const postModel = require("../models/post.model");
const responseData = require("../utils/respones");

const postController = {
  createPost: async (req, res) => {
    try {
      const { name, seat, status, idOwner, idModel, idMake, idType, location, price, locationAddr, rating, photos, photosVerified, isDriver } = req.body;
      const newPost = new postModel({ name, seat, status, idOwner, idModel, idMake, idType, location, price, locationAddr, rating, photos, photosVerified, isDriver });
      await newPost.save();
      res.json({ msg: "Tạo post thành công" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllPostFree: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const pagination = {
        perPage: Number(limit),
        currentPage: Number(page),
        nextPage: Number(page) + 1,
      }
      const { perPage, currentPage } = pagination
      let params = {
        status: 2,
        isDriver: false,
        approveVehicle: true
      };
      const dataResponse = {
        'name': 1,
        'photos': 2,
        'locationAddr': 3,
        'price': 4,
        'photosVerified': 5,
        'rating': 6
      }
      let totalPage = Math.ceil(await (await postModel.find(params)).length / (limit ? limit : 1))
      const posts = await postModel.find(params, dataResponse, function (err) {
        // eslint-disable-next-line no-undef
        if (err) return next(err);
      }).limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0);
      res.json(responseData(true, posts, null
        , { ...pagination, totalPage }
      ));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { name, seat, status, idOwner, idModel, idMake, idType, location, price, locationAddr, rating, photos, photosVerified } = req.body;
      await postModel.findByIdAndUpdate({ _id: req.params.id }, {
        name, seat, status, idOwner, idModel, idMake, idType, location, price, locationAddr, rating, photos, photosVerified
      })
      res.json({ msg: "Update Successful" })
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      await postModel.findByIdAndDelete(req.params.id)
      return res.json({ msg: "Delete Successful" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  sendRequestHireCar: async (req, res) => {
    try { } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
}

module.exports = postController;