/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
// const PostModel = require('../models/post/post.model');
const contractModel = require('../models/contract/contract.model');
const postModel = require('../models/post/post.model');
const RatingModel = require('../models/rating.model');
const { responseDataNormal } = require('../utils/response');

const RatingController = {
  getAllRatingPost: async (req, res) => {
    try {
      const { idPost, idContract } = req.body;
      const params = {
        ...idContract ? { idContract } : {},
        ...idPost ? { idPost } : {},
      };
      const rating = await RatingModel.find(params);
      res.json(responseDataNormal(true, rating, null));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createRating: async (req, res) => {
    try {
      const {
        idUser, value, idPost, idContract, comment,
      } = req.body;
      const ratingList = await RatingModel.find({ idPost });
      const rating = new RatingModel({
        idUser, value, idPost, idContract, comment,
      });
      rating.save();
      const total = ratingList.reduce((acc, curr) => acc += curr.value, 0);
      const avgRating = (total + value) / (ratingList.length + 1);
      await contractModel.findOneAndUpdate({ _id: idContract }, { isRating: true });
      await postModel.findOneAndUpdate({ _id: idPost }, {
        rating: {
          avg: avgRating,
          listRating: rating?._id,
        },
      });
      res.json(responseDataNormal(true, [], 'Thành công'));
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = RatingController;
