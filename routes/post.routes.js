const router = require('express').Router();
const postController = require('../controllers/post.controller');

router.get('/', postController.getAllPostFree);
router.get('/find-by-owner/:id', postController.getListPostByIdUser);
router.post('/', postController.createPost);

router.delete('/:id', postController.deletePost);
router.put('/:id', postController.updatePost);
router.get('/:id', postController.getDetailPost);
module.exports = router;
