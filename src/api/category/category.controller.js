const { Category } = require("../../models/category.model");

// CREATE NEW CATEGORY
const createNewCategory = async (req, res) => {
  try {
    const { category_name, category_photo } = req.body;

    // CHECK IF ALL FIELDS PROVIDED
    if (!category_name) {
      return res.status(400).json({
        error: true,
        message: "required field are missing",
      });
    }

    const newCategory = new Category({
      category_name,
      category_photo,
    });

    await newCategory.save();

    return res
      .status(201)
      .json({ success: true, message: "New category added" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating new category",
    });
  }
};

// GET ALL CATEGORIES
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, categories });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating new category",
    });
  }
};

// GET CATEGORY BY ID
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    return res.status(200).json({ success: true, category });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating new category",
    });
  }
};

// UPDATE CATEGORY BY ID
const updateCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category_name, category_photo } = req.body;

    // CHECK IF ALL FIELDS PROVIDED
    if (!category_name) {
      return res.status(400).json({
        error: true,
        message: "required field are missing",
      });
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { category_name, category_photo },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "category updated" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating new category",
    });
  }
};

// DELETE CATEGORY BY ID
const deleteCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({ success: true, message: "category deleted" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating new category",
    });
  }
};

module.exports = { createNewCategory, getCategoryById, getAllCategory, updateCategoryById, deleteCategoryById };
