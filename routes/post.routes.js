const postController = require("../controllers/post.controller");
const auth = require('../middleware/auth');

const router = require("express").Router();

router.get('/', postController.getAllPost)
router.post('/', postController.createPost);

router.delete('/:id', postController.deletePost)
router.put('/:id', postController.updatePost);
module.exports = router;