const requirePaperModel = require("../models/require-paper.model");

const RequirePapersController = {
  getRequirePaper: async (req, res) => {
    try {
      let paper = await requirePaperModel.find();
      res.json(paper);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createRequirePaper: async (req, res) => {
    const { name, logo } = req.body;
    const newPaper = new requirePaperModel({ name, logo });
    await newPaper.save();
    res.json({ msg: "Tạo thành công" });
    try {
      res.json({ msg: "Admin Resource" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteRequirePaper: async (req, res) => {
    try {
      await requirePaperModel.findByIdAndDelete(req.params.id);
      res.json({
        msg: "Xoá thành công"
      })
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateRequirePaper: async (req, res) => {
    try {
      const { name, logo, isAccept } = req.body;
      const param = {
        name, logo, isAccept
      }
      await requirePaperModel.findByIdAndUpdate({ _id: req.params.id }, param);
      res.json({ msg: "Cập nhật thành công" })
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
}
module.exports = RequirePapersController;