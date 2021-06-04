// const PostModel = require('../models/post/post.model');
const RatingModel = require('../models/rating.model');

const RatingController = {
  getAllRatingPost: async (req, res) => {
    try {
      // const { idPost } = req.body;
      // const post = await PostModel.findById({ _id: idPost });
      // const require = await RatingModel.find({ idUser });
      // res.json(require);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createRating: async (req, res) => {
    try {
      const {
        idUser, description, type, status,
      } = req.body;
      const notify = new RatingModel({
        idUser, description, type, status,
      });
      notify.save();
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = RatingController;
