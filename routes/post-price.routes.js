const router = require('express').Router();
const PostPriceController = require('../controllers/post-price.controller');

router.get('/', PostPriceController.getPostPrices);
router.post('/', PostPriceController.createPostPrice);

router.delete('/:id', PostPriceController.deletePostPrice);
router.put('/:id', PostPriceController.updatePostPrice);
module.exports = router;
