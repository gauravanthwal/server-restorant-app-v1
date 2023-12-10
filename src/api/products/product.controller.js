const { client } = require("../../../database");
const { Product } = require("../../models/products.models");

// CREATE NEW PRODUCT
const createProduct = async (req, res) => {
  try {
    const { product_name, price, product_photo, product_category } = req.body;

    if (!product_name || !price) {
      return res.status(400).json({
        error: true,
        message: "required field are missing",
      });
    }

    const product = new Product({
      product_name,
      price,
      product_photo,
      product_category,
    });
    await product.save();

    return res
      .status(201)
      .json({ success: true, message: "New Product Added" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating new product",
    });
  }
};

// GET ALL PRODCTS
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching products",
    });
  }
};

// GET PRODUCTS BY ID
const getProductsById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "There is not product with this id" });
    }
    return res.status(200).json({ success: true, product });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching products",
    });
  }
};

// GET PRODUCTS BY CATEGORY
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.body.category;

    const products = await Product.find({ product_category: category });
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "No product found" });
    }

    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching products",
    });
  }
};

// UPDATE PRODUCT BY ADMIN
const updateProductById = async (req, res) => {
  try {
    const { product_name, price, product_photo } = req.body;
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "No product found" });
    }

    const products = await Product.findByIdAndUpdate(
      productId,
      { product_name, price, product_photo },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "product updated" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching products",
    });
  }
};

// DELETE PRODUCT BY ADMIN
const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "No product found" });
    }

    const products = await Product.findByIdAndDelete(productId);

    return res.status(200).json({ success: true, message: "product deleted" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching products",
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsById,
  updateProductById,
  deleteProductById,
};
