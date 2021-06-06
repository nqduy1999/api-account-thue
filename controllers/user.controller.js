/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user/user.model');
const sendMail = require('../services/sendMail.services');
const phoneServiceSms = require('../middleware/phone.service.sms');
const { responseDataNormal } = require('../utils/response');

const { CLIENT_URL } = process.env;

const UserController = {
  register: async (req, res) => {
    try {
      const {
        email, password, name, phone, rePassword,
      } = req.body;
      if (email) {
        if (!validateEmail(email)) { return res.status(400).json({ msg: 'Email không hợp lệ' }); }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Email đã tồn tại' });
        if (password.length < 6) { return res.status(400).json({ msg: 'Mật khẩu phải nhiều hơn 6 ký tự' }); }
        if (rePassword !== password) { return res.status(400).json({ msg: 'Mật khẩu không giống' }); }
        const passwordHash = await bcrypt.hash(password, 12);
        const newUser = new User({
          name,
          email,
          password: passwordHash,
        });
        await newUser.save();
        const activation_token = createActivationToken({
          email,
          name,
          password: passwordHash,
        });
        const url = `${CLIENT_URL}activate?token=${activation_token}`;
        sendMail(email, url, 'Bấm vào đây để kích hoạt tài khoản');
        res.json({
          msg: 'Đăng ký thành công, Vui lòng xác nhận email ',
        });
      }
      if (phone) {
        const newPhone = phone.slice(1, 10);
        if (!validatePhone(phone)) { return res.status(400).json({ msg: 'Sai định dạng số điện thoại' }); }
        if (password.length < 6) { return res.status(400).json({ msg: 'Mật khẩu phải nhiều hơn 6 ký tự' }); }
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.findOne({ phone });
        if (user) return res.status(400).json({ msg: 'Số điện thoại đã đăng ký' });
        const result = await phoneServiceSms.sendSmsOTP(newPhone);
        if (result !== true) {
          res.status(500).json([
            {
              msg: 'Send sms failed',
              param: 'sms',
            },
          ]);
        } else {
          res.status(201).json({
            msg: 'Đăng ký thành công, Mã xác nhận đã được gửi về số điện thoại của bạn',
          });
          const newUser = new User({
            name,
            phone,
            password: passwordHash,
          });
          await newUser.save();
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resendCodePhone: async (req, res) => {
    try {
      const { phone } = req.body;
      const newPhone = phone.slice(1, 10);
      const result = await phoneServiceSms.sendSmsOTP(newPhone);
      if (result !== true) {
        res.status(500).json([
          {
            msg: 'Send sms failed',
            param: 'sms',
          },
        ]);
      } else {
        res.status(201).json({
          msg: 'Gửi mã về điện thoại thành công',
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resendActiveEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const userFind = await User.findOne({ email });
      const activation_token = createActivationToken({
        email,
        name: userFind.name,
        password: userFind.password,
      });
      const url = `${CLIENT_URL}activate?token=${activation_token}`;
      sendMail(email, url, 'Bấm vào đây để kích hoạt tài khoản');
      res.json({
        msg: 'Gửi mã thành công, Vui lòng xác nhận email',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET,
      );
      const { email } = user;
      await User.findOneAndUpdate({ email }, {
        isActive: true,
        emailVerified: true,
      });
      res.json({ msg: 'Kích hoạt tài khoản thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  verifyPhone: async (req, res) => {
    try {
      const { phone, code } = req.body;
      const result = await phoneServiceSms.verifyOtp(phone, code);
      if (result) {
        await User.findOneAndUpdate({ phone }, {
          isActive: true,
          phoneVerified: true,
        });
        res.json({ msg: 'Kích hoạt tài khoản thành công' });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password, phone } = req.body;
      let user;
      if (email) { user = await User.findOne({ email }); }
      if (phone) { user = await User.findOne({ phone }); }
      let access_token = '';
      if (!user) {
        if (email) {
          return res
            .status(400)
            .json({ msg: 'Không đúng email hoặc mật khẩu' });
        }
        if (phone) {
          return res.status(400).json({ msg: 'Không đúng số điện thoại hoặc mật khẩu' });
        }
      }
      const isMatchPass = await bcrypt.compare(password, user.password);
      if (!isMatchPass) {
        return res
          .status(400)
          .json({ msg: 'Mật khẩu không đúng vui lòng nhập lại' });
      }
      if (!user.isActive) {
        return res
          .status(400)
          .json({ msg: 'Chưa kích hoạt tài khoản' });
      }
      const refresh_token = createRefreshToken({ id: user.id });
      if (!refresh_token) return res.status(400).json({ msg: '' });
      jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.status(400).json({ msg: '' });
          access_token = createAccessToken({ id: user.id, ...email ? { email } : {}, ...phone ? { phone } : {} });
        },
      );
      const result = {
        status: 200,
        msg: 'Đăng nhập thành công',
        data: {
          id: user._id,
          email,
          phone,
          name: user.name,
          role: user.role === 1 ? 'ADMIN' : 'USER',
        },
        access_token,
      };
      res.cookie('jwt', access_token, { secure: true, httpOnly: true });
      return res.send(result);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Email không tồn tại' });
      const access_token = createAccessToken({ id: user.id });
      const url = `${CLIENT_URL}user/reset/${access_token}`;
      sendMail(email, url, 'Reset your password');
      res.json({
        msg:
          'Gửi email đặt lại mật khẩu thành công, vui lòng kiểm tra mail để xác nhận',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        },
      );

      res.json({ msg: 'Thay đổi password thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const users = await User.findById(req.user.id);
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfoById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.find({ _id: id });
      res.json(responseDataNormal(true, user, null));
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logOut: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/user/refresh_token' });
      res.json({ msg: 'Logout' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        name, avatar, GPLX, phone, address, CMND, infoPayment,
      } = req.body;
      await User.findByIdAndUpdate({ _id: req.user.id }, {
        name,
        avatar,
        GPLX,
        phone,
        address,
        CMND,
        infoPayment,
      });
      res.json({ msg: 'Cập nhật thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  channgePassword: async (req, res) => {
    try {
      const { password, newPassword, rePassword } = req.body;
      const isMatchPass = await bcrypt.compare(password, req.user.password);
      if (!isMatchPass) { return res.status(400).json({ msg: 'Mật khẩu không giống' }); }
      if (newPassword !== rePassword) {
        return res.status(400).json({ msg: 'Mật khẩu gõ lại không chính xác' });
      }
      if (newPassword.length < 6) { return res.status(400).json({ msg: 'Mật khẩu phải nhiều hơn 6 ký tự' }); }
      const passwordHash = await bcrypt.hash(password, 12);
      await User.findByIdAndUpdate({ _id: req.user.id }, {
        password: passwordHash,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  verifyLicense: async (req, res) => {
    try {
      const {
        id, approveLicense, approvePassport, approveIdentification,
      } = req.body;
      const params = {
        status: 2,
        isDriver: false,
        ...approveLicense ? { approveLicense } : {},
        ...approvePassport ? { approvePassport } : {},
        ...approveIdentification ? { approveIdentification } : {},
      };
      await User.findByIdAndUpdate({ _id: id }, params);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  checkPhoneAndEmail: async (req, res) => {
    try {
      const { email, phone } = req.body;
      let user;
      if (email) { user = await User.findOne({ email }); }
      if (phone) { user = await User.findOne({ phone }); }
      if (user) {
        return res.status(400).json({ msg: `${email ? 'Email' : 'Số điện thoại'} đã tồn tại` });
      }
      res.json({ msg: 'ok' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validatePhone(phone) {
  const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return re.test(phone);
}
const createActivationToken = (payload) => jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
  expiresIn: '5m',
});
const createAccessToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: '1d',
});
const createRefreshToken = (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
  expiresIn: '7d',
});
module.exports = UserController;
