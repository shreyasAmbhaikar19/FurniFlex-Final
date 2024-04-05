const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, 
  },
  subscription: {
    duration: Number,
    monthlyPrice: Number,
  },
  totalPrice: { 
    type: Number,
    required: true
  }
});

CartSchema.pre('save', function(next) {
  if (this.subscription && this.subscription.monthlyPrice && this.subscription.duration) {
    this.totalPrice = this.quantity * this.subscription.monthlyPrice * this.subscription.duration;
  }
  next();
});


module.exports = mongoose.model("Cart", CartSchema);
