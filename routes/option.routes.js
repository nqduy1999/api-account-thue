const router = require('express').Router();
const OptionsController = require('../controllers/option.controller');

router.get('/', OptionsController.getOptions);
router.post('/', OptionsController.createOption);

router.delete('/:id', OptionsController.deleteOption);
router.put('/:id', OptionsController.updateOption);
module.exports = router;
