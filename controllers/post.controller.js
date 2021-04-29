const postModel = require("../models/post.model");

class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach(el => delete (queryObj[el]));
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
    //gte : Lớn hơn hoặc bằng giá trị được chọn
    //lte: Bé hơn hoặc bằng giá trị được chọn 
    //lt : bé hơn giá trị được chọn 
    //gt : Lớn hơn giá trị được chọn 
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy);
    }
    else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const postController = {
  createPost: async (req, res) => {
    try {
      const { name, seat, status, idOwner, idModel, idMake, idType, location, price, locationAddr, rating, photos, photosVerified } = req.body;
      const newPost = new postModel({ name, seat, status, idOwner, idModel, idMake, idType, location, price, locationAddr, rating, photos, photosVerified });
      await newPost.save();
      res.json({ msg: "Tạo post thành công" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllPost: async (req, res) => {
    try {
      const feature = new APIFeature(postModel.find(), req.query).filtering().sorting().paginating();
      const post = await feature.query;
      res.json({
        status: "success",
        result: post.length,
        posts: post
      });
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
      res.json({ msg: "Update Sucessful" })
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      await postModel.findByIdAndDelete(req.params.id)
      return res.json({ msg: "Delete Sucessful" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = postController;