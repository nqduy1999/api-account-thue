/* eslint-disable import/order */
const OptionController = require('../controllers/options.controller');
// const auth = require('../middleware/auth');

const router = require('express').Router();
// Option
router.get('/option', OptionController.getAllOption);
router.put('/option/:id', OptionController.updateOption);
router.post('/option', OptionController.createOption);
router.delete('/option/:id', OptionController.deleteOption);
module.exports = router;
