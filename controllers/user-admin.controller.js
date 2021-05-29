/* eslint-disable consistent-return */
const User = require('../models/user/user.model');
const { responseData, responseDataNormal } = require('../utils/response');

const UserAdminController = {
  getUsersAllInfo: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById({ _id: id });
      res.json(user);
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
    const { textSearch, isSearch } = req.query;
    const { perPage, currentPage } = paginator;
    try {
      const totalPage = Math.ceil((await User.find()).length / (req.query.limit || 1));
      const users = await User.find(isSearch ? { name: { $regex: `${textSearch}`, $options: 'i' } } : {}).limit(perPage).skip(currentPage > 0 ? (currentPage - 1) * perPage : 0).select('-password');
      res.json(responseData(true, users, null,
        { ...paginator, totalPage }));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAllUser: async (req, res) => {
    try {
      const {
        name,
        avatar,
        role,
        isActive,
        accountBalance,
        address,
        emailVerified,
        phone,
        phoneVerified,
        email,
        GPLX,
        CMND,
      } = req.body;
      await User.findByIdAndUpdate({ _id: req.params.id }, {
        name,
        avatar,
        role,
        isActive,
        accountBalance,
        address,
        emailVerified,
        phone,
        phoneVerified,
        email,
        GPLX,
        CMND,
      });
      res.json(responseDataNormal(true, null, 'Cập nhật thành công '));
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
