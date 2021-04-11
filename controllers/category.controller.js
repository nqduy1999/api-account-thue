const categoryModel = require("../models/category.model");

const categoryController = {
    getCategory: async (req, res) => {
        try {
            const categories = await categoryModel.find();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    createCategory: async (req, res) => {
        const { name } = req.body;
        const category = await categoryModel.findOne({ name: name });
        if (category) {
            res.status(400).json({ msg: "Trùng tên" });
            return;
        }
        const newCategory = new categoryModel({ name });
        await newCategory.save();
        res.json({ msg: "sucesss" });
        try {
            res.json({ msg: "Admin Resource" });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deteleCategory: async (req, res) => {
        try {
            await categoryModel.findByIdAndDelete(req.params.id);
            res.json({
                msg: "Delete Sucessful"
            })
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const param = {
                name
            }
            await categoryModel.findByIdAndUpdate({ _id: req.params.id }, param);
            res.json({ msg: "Update Sucessfully" })
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}
module.exports = categoryController;