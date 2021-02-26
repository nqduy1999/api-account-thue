// const User = require('../models/user_model');

const UserController = {
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      if (!email || !name || !password) return res.status(400).json({ msg: 'Please fill in all field' });
      res.json({
        msg: 'Register Test',
      });
      if (!validateEmail(email)) return res.status(400).json({ msg: 'Please fill in all field' });
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
module.exports = UserController;
