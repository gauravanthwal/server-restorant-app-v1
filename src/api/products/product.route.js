const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
  getProductsById,
  getProductsByCategory,
  updateProductById,
  deleteProductById,
} = require("./product.controller");
const { authUser } = require("../../middleware/authUser");
const router = Router();

// CREATE NEW PRODUCT
router.post("/new", createProduct);

// GET ALL PRODCTS
router.get("/all", getAllProducts);

// GET PRODUCTS BY ID
router.get("/getById/:productId", getProductsById);

// GET PRODUCTS BY CATEGORY
router.get("/getByCategory", getProductsByCategory);

// UPDATE PRODUCT BY ADMIN
router.put("/updateProductById/:productId", authUser, updateProductById)

// DELETE PRODUCT BY ADMIN
router.delete("/deleteProductById/:productId", authUser, deleteProductById)


//-------------- TO-DO --------------//

// UPDATE PRODUCT DETAILS

// DELETE PRODUCT BY ID

module.exports = router;
