const { Product } = require("../../../models/products.models");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2022-08-01",
});

// MAKE PAYMENT WITH RAZORPAY
const createCheckoutSessionStripe = async (req, res) => {
  try {
    const cartItems = req.body.cartItems;

    if (!cartItems) {
      return res.status(400).json({ error: true, message: "No item selected" });
    }


    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item?.product?.product_name,
            images: [item?.product?.product_photo],
            description: item?.description || item?.product?.product_name,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: item?.product?.price * 100,
        },
        quantity: item?.quantity,
      };
    });

    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user.user_id,
        cartItems: JSON.stringify(cartItems.map(item=>({_id: item?.product?._id, quantity: item?.quantity}))),
      },
    });

    // const subscription = cartItems.map(item=>({_id: item.product_id}));
    // const products = Product.find({
    //   $or: subscription
    // })

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      customer: customer.id,
      payment_method_types: [],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });

    res.json({ url: session.url, session });
  } catch (err) {
    console.log(err);
  }
};

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// let endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const endpointSecret =
  "whsec_a287b1a891884ffee044536436997a76959a626a89cfd05900c2f44285524173";

const webhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook Verified");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error ${err.message}`);
      return;
    }

    data = req.body.object;
    eventType = req.body.type;
  } else {
    data = req.body.object;
    eventType = req.body.type;
  }

  console.log('its running', data, eventType);
  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log("customer", customer);
        console.log("data", data);
      })
      .catch((err) => console.log(err.message));
  }
};
module.exports = {
  createCheckoutSessionStripe,
  webhookHandler,
};
