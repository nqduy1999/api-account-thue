/* eslint-disable import/order */
const OptionController = require('../controllers/options.controller');
// const auth = require('../middleware/auth');

const router = require('express').Router();
// Option
router.get('/', OptionController.getAllOption);
router.put('/:id', OptionController.updateOption);
router.post('/', OptionController.createOption);
router.delete('/:id', OptionController.deleteOption);
module.exports = router;
