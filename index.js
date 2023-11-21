require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./database.js");
const PORT = process.env.PORT || 5000;

const userRoute = require("./src/api/users/user.route.js");
const productRoute = require("./src/api/products/product.route.js");
// const ordersRoute = require("./src/api/orders/order.route.js");
const cartRoute = require("./src/api/carts/cart.route.js");

// DataBase setup
connectDB();

// Middlewares setup
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
// app.use("/api/v1/order", ordersRoute);
app.use("/api/v1/cart", cartRoute);

app.use("*", (req, res) => {
  res.status(404).json({message: 'Not found'})
});

app.listen(PORT, () => console.log("server running on port ", PORT));
