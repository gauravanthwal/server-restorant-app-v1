const { client } = require("../../../database");
const { verifyToken } = require("../../common/validation/createToken");

// CREATE NEW ORDERS
const createOrders = async (req, res) => {
  try {
    const { product_id, order_status } = req.body;
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

    const values = [product_id, user?.user_id, order_status];
    const result = await client.query(
      `insert into orders(product_id, user_id, order_status) values($1, $2, $3)`,
      values
    );

    if (result?.rows) {
      return res
        .status(201)
        .json({ success: true, message: "New order added" });
    }
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
    const result = await client.query(`select * from orders`);

    if (result?.rows) {
      return res.status(200).json({ success: true, products: result?.rows });
    }
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while fetching orders",
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
    const { userId } = req.body;
    const result = await client.query(
      `select * from orders where user_id = $1`,
      [userId]
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

module.exports = {
  createOrders,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
};
