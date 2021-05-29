const router = require('express').Router();
const postController = require('../controllers/post.controller');

router.get('/', postController.getAllPostFree);
router.get('/admin', postController.getAllPostAdmin);
router.get('/user-post/:id', postController.getListPostByIdUser);
router.post('/', postController.createPost);

router.delete('/:id', postController.deletePost);
router.put('/:id', postController.updatePost);
router.get('/:id', postController.getDetailPost);
router.delete('/admin/:id', postController.deletePostAdmin);
router.put('/admin/:id', postController.updatePostAdmin);
module.exports = router;
