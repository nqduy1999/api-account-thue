// const PostModel = require('../models/post/post.model');
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
      const rating = new RatingModel({
        idUser, value, idPost, idContract, comment,
      });
      rating.save();
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = RatingController;
