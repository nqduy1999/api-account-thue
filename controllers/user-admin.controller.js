/* eslint-disable consistent-return */
const User = require('../models/user.model');
const { responseData } = require('../utils/response');

const UserAdminController = {
  getUsersAllInfo: async (req, res) => {
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
      nextPage: Number(req.query.page) + 1,
    };
    const { perPage, currentPage } = paginator;
    try {
      const totalPage = Math.ceil((await User.find()).length / (req.query.limit || 1));
      const users = await User.find().limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0).select('-password');
      res.json(responseData(true, users, null,
        { ...paginator, totalPage }));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAllUser: async (req, res) => {
    try {
      const { name, avatar, role } = req.body;
      await User.findByIdAndUpdate({ _id: req.params.id }, {
        name,
        avatar,
        role,
      });
      res.json({ msg: 'Cập nhật thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Xoá thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = UserAdminController;
