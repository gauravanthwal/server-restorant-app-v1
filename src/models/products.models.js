const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: ""
    },
    price: {
      type: Number,
      required: true,
    },
    product_photo: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = { Product };
