const router = require('express').Router();
const RatingController = require('../controllers/rating.controller');

router.get('/', RatingController.getAllRatingPost);
router.post('/', RatingController.createRating);

module.exports = router;
