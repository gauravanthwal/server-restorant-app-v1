const { client } = require("../../../database");
const { verifyToken } = require("../../common/validation/createToken");
const { Order } = require("../../models/orders.model");

// CREATE NEW ORDERS
const createOrders = async (req, res) => {
  try {
    const { product_id, quantity, order_status } = req.body;
    const token = req?.headers?.authorization?.split("Bearer ")[1];

    // CHECK IF PRODUCT ID PROVIDED
    if (!product_id) {
      return res.status(400).json({
        error: true,
        message: "required field are missing",
      });
    }

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
    console.log(user);

    const newOrder = new Order({
      user: user?.user_id,
      product: product_id,
      quantity,
    });

    await newOrder.save();

    return res.status(201).json({ success: true, message: "New order added" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating new order",
    });
  }
};

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("product").populate("user").sort({createdAt: -1});

    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching orders",
    });
  }
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const { newOrderStatus } = req.body;
    const { orderId } = req.params;

    if (!newOrderStatus || !orderId) {
      return res.status(400).json({
        error: true,
        message: "required field are missing",
      });
    }

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { order_status: newOrderStatus },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Order updated." });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating new order",
    });
  }
};

// GET ORDERS BY ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const result = await client.query(
      `select * from orders where order_id = $1`,
      [orderId]
    );

    if (result?.rows) {
      return res.status(201).json({ success: true, orders: result?.rows });
    }
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching order",
    });
  }
};

// GET ORDERS BY USER ID
const getOrderByUserId = async (req, res) => {
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

    const orders = await Order.find({ user: user?.user_id }).populate(
      "product"
    );

    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching order",
    });
  }
};

module.exports = {
  createOrders,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
};
