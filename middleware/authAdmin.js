const Users = require('../models/user/user.model');

// eslint-disable-next-line consistent-return
const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (user.role !== 1) return res.status(500).json({ msg: 'Admin resources access denied.' });
    next();
  } catch (err) {
    return res.status(500).json({ msg: 'hihi' });
  }
};

module.exports = authAdmin;
