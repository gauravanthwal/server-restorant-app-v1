const { Router } = require("express");
const {
  createOrders,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
} = require("./order.controller");
const { authUser } = require("../../middleware/authUser");
const router = Router();

// CREATE NEW ORDERS
router.post("/new", createOrders);

// GET ALL ORDERS
router.get("/all", getAllOrders);

// GET ORDERS BY ID
router.get("/getById/:orderId", getOrderById);

// GET ORDERS BY USERID
router.get("/getByUserId", getOrderByUserId);

// UPDATE ORDER STATUS
router.put("/updateOrderStatus/:orderId", authUser, updateOrderStatus);

//-------------- TO-DO --------------//

// UPDATE ORDER DETAILS

module.exports = router;
