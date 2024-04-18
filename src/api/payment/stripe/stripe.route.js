const express = require("express");
const router = express.Router();
const { authUser } = require("../../../middleware/authUser");
const {
  createCheckoutSessionStripe,
  webhookHandler,
} = require("./stripe.controller");

// PAYMENT WITH RAZORPAY
router.post("/create-checkout-session", authUser, createCheckoutSessionStripe);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);

//-------------- TO-DO --------------//

module.exports = router;
