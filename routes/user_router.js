const router = require('express').Router();
const userController = require('../controllers/user_controller');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.post('/register', userController.register);
router.post('/activation', userController.activateEmail);
router.post('/login', userController.login);
router.post('/forgot', userController.forgotPassword);
router.post('/reset',auth, userController.resetPassword);
router.get('/infor',auth, userController.getUserInfo);
router.get('/all_info',auth ,authAdmin, userController.getUsersAllInfor);
router.get('/all_info_page',auth ,authAdmin, userController.getUserByPage);
router.get('/logout', userController.logOut);
router.put('/update',auth, userController.updateUser);
router.put('/update_for_admin/:id',auth, authAdmin, userController.updateUser);
router.delete('/delete/:id',auth, authAdmin, userController.deleteUser);

module.exports = router;
