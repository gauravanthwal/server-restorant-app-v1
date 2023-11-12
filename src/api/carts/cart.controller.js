const { client } = require("../../../database");
const { verifyToken } = require("../../common/validation/createToken");
const { Cart } = require("../../models/carts.model");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const token = req?.headers?.authorization?.split("Bearer ")[1];

    // CHECK IF TOKEN PROVIDED
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    // VERIFY TOKEN
    const user = verifyToken(token);

    // CHECK IF TOKEN VALID
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    // CHECK IF PRODUCT ID PROVIDED
    if (!product) {
      return res.status(400).json({
        error: true,
        message: "required field are missing",
      });
    }

    const cart = new Cart({ product, quantity, user: user?.user_id });

    await cart.save();

    return res
      .status(201)
      .json({ success: true, message: "Item added to cart" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while add to cart",
    });
  }
};

// REMOVE ITEMS FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { product } = req.body;

    const token = req?.headers?.authorization?.split("Bearer ")[1];

    // CHECK IF TOKEN PROVIDED
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    // VERIFY TOKEN
    const user = verifyToken(token);

    // CHECK IF TOKEN VALID
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    if (!product) {
      return res.status(400).json({
        error: true,
        message: "Product id is required",
      });
    }

    await Cart.deleteMany({ user: user?.user_id, product });

    return res
      .status(200)
      .json({ success: true, message: "Product removed from cart" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching orders",
    });
  }
};

// GET CART ITEMS BY USERID
const getCartItemByUser = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split("Bearer ")[1];

    // CHECK IF TOKEN PROVIDED
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    // VERIFY TOKEN
    const user = verifyToken(token);

    // CHECK IF TOKEN VALID
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    const cartItems = await Cart.find({ user: user?.user_id }).populate(
      "product"
    );

    return res.status(200).json({ success: true, cartItems });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching cart items",
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCartItemByUser,
};
