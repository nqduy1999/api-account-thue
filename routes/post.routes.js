const postController = require("../controllers/post.controller");
const auth = require('../middleware/auth');

const router = require("express").Router();

router.get('/', auth, postController.getAllPost)
router.post('/', auth, postController.createPost);

router.delete('/:id', auth, postController.deletePost)
router.put('/:id', auth, postController.updatePost);
module.exports = router;