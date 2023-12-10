const { Router } = require("express");
const { authUser } = require("../../middleware/authUser");
const {
  createNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("./category.controller");
const router = Router();

// CREATE NEW CATEGORY
router.post("/newCategory", authUser, createNewCategory);

// GET ALL CATEGORY
router.get("/all", getAllCategory);

// GET CATEGORY BY ID
router.get("/getCategoryById/:categoryId", getCategoryById);

// UPDATE CATEGORY BY ID
router.put("/updateCategoryById/:categoryId", authUser, updateCategoryById);

// DELETE CATEGORY BY ID
router.delete("/deleteCategoryById/:categoryId", authUser, deleteCategoryById);

//-------------- TO-DO --------------//

module.exports = router;
