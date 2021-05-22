const router = require('express').Router();
const RequestController = require('../controllers/request.controller');

router.post('/send', RequestController.createRequest);
router.get('/', RequestController.getRequest);
router.put('/:id', RequestController.updateRequest);

module.exports = router;
