const { Router } = require("express");
const {
  addToCart, removeFromCart, getCartItemByUser
} = require("./cart.controller");
const router = Router();

// ADD TO CART
router.post("/addToCart", addToCart);

// REMOVE FROM CART
router.delete("/removeFromCart", removeFromCart);

// GET CART ITEMS BY USER
router.get("/getByUser", getCartItemByUser);


//-------------- TO-DO --------------//

// 

module.exports = router;
