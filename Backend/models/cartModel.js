const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: [true, "Please enter product quantity"],
    default: 1, 
  },
});

module.exports = mongoose.model("Cart", CartSchema);
