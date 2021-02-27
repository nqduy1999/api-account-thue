const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      if (!validateEmail(email)) return res.status(400).json({ msg: 'Email không hợp lệ' });
      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Email đã tồn tại' });
      if (password.length < 6) return res.status(400).json({ msg: 'Mật khẩu phải nhiều hơn 6 ký tự' });
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        name,
        email,
        password: passwordHash,
      };
      console.log(newUser);
      const activation_token = createActivationToken(newUser);
      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url);
      console.log({ activation_token });
      res.json({
        msg: 'Đăng ký thành công, Vui long xac nhan email ',
      });
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
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};
module.exports = UserController;
