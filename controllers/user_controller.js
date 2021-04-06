const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../services/sendMail');

const { CLIENT_URL } = process.env;

const UserController = {
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      if (!email || !name || !password) {
        return res
          .status(400)
          .json({ msg: 'Vui lòng điền tất cả khoảng trắng' });
      }
      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Email không hợp lệ' });
      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Email đã tồn tại' });
      if (password.length < 6)
        return res.status(400).json({ msg: 'Mật khẩu phải nhiều hơn 6 ký tự' });
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        name,
        email,
        password: passwordHash
      };
      const activation_token = createActivationToken(newUser);
      const url = `${CLIENT_URL}user/activate/${activation_token}`;
      sendMail(email, url, 'Verify your Email');
      res.json({
        msg: 'Đăng ký thành công, Vui lòng xác nhận email '
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
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { name, email, password } = user;

      const check = await User.findOne({ email });
      if (check)
        return res.status(400).json({ msg: 'Mail này đã được đăng ký' });
      const newUser = new User({
        name,
        email,
        password
      });
      await newUser.save();
      res.json({ msg: 'Kích hoạt tài khoản thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: 'Email không tồn tại vui lòng kiểm tra lại' });
      const isMatchPass = await bcrypt.compare(password, user.password);
      if (!isMatchPass)
        return res
          .status(400)
          .json({ msg: 'Mật khẩu không đúng vui lòng nhập lại' });
      const refresh_token = createRefreshToken({ id: user._id });
      if (!refresh_token) return res.status(400).json({ msg: '' });

      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.status(400).json({ msg: '' });
          const access_token = createAccessToken({ id: user.id });
          res.cookie('accessToken', access_token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
          });
        }
      );
      res.json({
        msg: 'Đăng nhập thành công'
      });
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
          'Gửi email đặt lại mật khẩu thành công, vui lòng kiểm tra mail để xác nhận'
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      console.log(password);
      const passwordHash = await bcrypt.hash(password, 12);

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash
        }
      );

      res.json({ msg: 'Thay đổi password thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const users = await User.findById(req.user.id).select('-password');
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserByPage: async (req, res) => {
    const paginator = {
      perPage: Number(req.query.limit),
      currentPage: Number(req.query.page),
      nextPage: Number(req.query.page)+1,
    }
    const {perPage, currentPage} = paginator
    try {
        const users = await User.find().limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0).select('-password');
        res.json({users, paginator});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logOut: async (req, res) =>{
    try {
      res.clearCookie('refreshToken',{path: '/user/refresh_token'})
      res.json({msg : "Logout"})
    } catch (err) {
      return res.status(500).json({msg: err.message})  
    }
  },
  updateUser: async (req, res) =>{
    try {
      const {name, avatar} = req.body;
      await User.findByIdAndUpdate({_id:req.user.id}, {
        name,
        avatar
      })
      res.json({msg :'Cập nhật thành công'});
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  updateAllUser: async (req, res) =>{
    try {
      const {name, avatar, role} = req.body;
      await User.findByIdAndUpdate({_id:req.params.id}, {
        name,
        avatar,
        role
      })
      res.json({msg :'Cập nhật thành công'});
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  deleteUser: async (req, res) =>{
    try {
      await User.findByIdAndDelete(req.params.id)
      res.json({msg :'Xoá thành công'});
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
};

function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m'
  });
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  });
};
module.exports = UserController;
