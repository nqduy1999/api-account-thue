const categoryController = require("../controllers/category.controller");
const auth = require('../middleware/auth');

const router = require("express").Router();
router.get("/", auth, categoryController.getCategory)
router.post("/", auth, categoryController.createCategory);

router.delete("/:id", auth, categoryController.deteleCategory);
router.put("/:id", auth, categoryController.updateCategory);
module.exports = router;