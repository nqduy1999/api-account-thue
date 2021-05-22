const router = require('express').Router();
const NotifyController = require('../controllers/notify.controller');

router.get('/', NotifyController.getAllNotifyUser);
router.post('/', NotifyController.createNotify);

module.exports = router;
