const { Router } = require("express");

const { authUser } = require("../../../middleware/authUser");
const { makePaymentWithRazorpay, savePaymentWithRazorpay } = require("./razorpay.controller");
const router = Router();

// PAYMENT WITH RAZORPAY
router.post("/pay-with-razorpay", authUser, makePaymentWithRazorpay);


// router.post("/save-payment", authUser, savePaymentWithRazorpay);

//-------------- TO-DO --------------//

module.exports = router;
