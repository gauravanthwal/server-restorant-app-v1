const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    category_photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", CategorySchema);

module.exports = { Category };
