const router = require('express').Router();
const UserAdminController = require('../controllers/user-admin.controller');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.post('/register', userController.register);
router.post('/resend_token', userController.resendActiveEmail);
router.post('/resend_code', userController.resendCodePhone);
router.post('/activation', userController.activateEmail);
router.post('/verify', userController.verifyPhone);
router.post('/login', userController.login);
router.post('/forgot', userController.forgotPassword);
router.post('/reset', auth, userController.resetPassword);
router.get('/info', auth, userController.getUserInfo);
router.get('/info/:id', userController.getUserInfoById);
router.post('/logout', userController.logOut);
router.put('/', auth, userController.updateUser);
router.put('/admin/verify-license', auth, authAdmin, userController.verifyLicense);
router.post('/check', userController.checkPhoneAndEmail);
//
router.put('/admin/:id', auth, authAdmin, UserAdminController.updateAllUser);
router.get('/admin/:id', auth, authAdmin, UserAdminController.getUsersById);
router.get('/admin', auth, authAdmin, UserAdminController.getUserByPage);
router.delete('/admin/:id', auth, authAdmin, UserAdminController.deleteUser);

module.exports = router;
