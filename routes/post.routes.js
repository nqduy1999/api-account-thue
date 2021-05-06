const router = require('express').Router();
const postController = require('../controllers/post.controller');

router.get('/', postController.getAllPostFree);
router.get('/:id', postController.getListPostByIdUser);
router.post('/', postController.createPost);

router.delete('/:id', postController.deletePost);
router.put('/:id', postController.updatePost);
module.exports = router;
