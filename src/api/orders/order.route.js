const { Router } = require("express");
const {
  createOrders,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
} = require("./order.controller");
const router = Router();

// CREATE NEW ORDERS
router.post("/new", createOrders);

// GET ALL ORDERS
router.get("/all", getAllOrders);

// GET ORDERS BY ID
router.get("/getById/:orderId", getOrderById);

// GET ORDERS BY USERID
router.get("/getByUserId", getOrderByUserId);

//-------------- TO-DO --------------//

// UPDATE ORDER DETAILS

module.exports = router;
