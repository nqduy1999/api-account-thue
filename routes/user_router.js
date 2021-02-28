const router = require('express').Router();
const userController = require('../controllers/user_controller');

router.post('/register', userController.register);
router.post('/activation', userController.activateEmail);
router.post('/login', userController.login)
module.exports = router;
