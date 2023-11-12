const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
  getProductsById,
  getProductsByCategory,
} = require("./product.controller");
const router = Router();

// CREATE NEW PRODUCT
router.post("/new", createProduct);

// GET ALL PRODCTS
router.get("/all", getAllProducts);

// GET PRODUCTS BY ID
router.get("/getById/:productId", getProductsById);

// GET PRODUCTS BY CATEGORY
router.get("/getByCategory", getProductsByCategory);



//-------------- TO-DO --------------//

// UPDATE PRODUCT DETAILS


// DELETE PRODUCT BY ID


module.exports = router;
