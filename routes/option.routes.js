const OptionsController = require("../controllers/option.controller");
// const auth = require('../middleware/auth');

const router = require("express").Router();

router.get('/', OptionsController.getRequirePaper)
router.post('/', OptionsController.createRequirePaper);

router.delete('/:id', OptionsController.deleteRequirePaper)
router.put('/:id', OptionsController.updateRequirePaper);
module.exports = router;