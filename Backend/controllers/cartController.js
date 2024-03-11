const Cart = require('../models/cartModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

// Get All Cart Items 
exports.createCartItems = asyncErrorHandler(async (req, res, next) => {
    const { user, product, quantity, subscription } = req.body;
    const totalPrice = quantity * subscription.monthlyPrice;
  
    try {
        const cartItem = await Cart.create({ 
          user, 
          product, 
          quantity, 
          subscription,
          totalPrice 
        });
        res.status(201).json({
            success: true,
            cartItem
        });
    } catch (error) {
        next(new ErrorHandler("Error creating cart item", 400));
    }
  });

  exports.getAllCartItems = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const cartItems = await Cart.find({ user: userId })
          .populate('product', 'name price images') 
          .populate('user', 'name'); 
        
        res.status(200).json({
            success: true,
            count: cartItems.length,
            cartItems
        });
    } catch (error) {
        next(error);
    }
};

// Update Cart Item Quantity
exports.updateCartItem = asyncErrorHandler(async (req, res, next) => {
  const cartId = req.params.cartId;
  const { quantity } = req.body; // Only allow updating quantity

  try {
      const updatedCartItem = await Cart.findByIdAndUpdate(cartId, { quantity }, { new: true }); // Update quantity only
      if (!updatedCartItem) {
          return next(new ErrorHandler("Cart Item Not Found", 404));
      }
      res.status(200).json({
          success: true,
          updatedCartItem
      });
  } catch (error) {
      next(new ErrorHandler("Error updating cart item", 500));
  }
});

// Delete Cart Item
exports.deleteCartItem = asyncErrorHandler(async (req, res, next) => {
    const cartId = req.params.cartId;
    try {
        const deletedCartItem = await Cart.findByIdAndDelete(cartId);
        if (!deletedCartItem) {
            return next(new ErrorHandler("Cart Item Not Found", 404));
        }
        res.status(204).json({
            success: true,
            message: 'Product removed from cart successfully',
        });
    } catch (error) {
        next(new ErrorHandler("Error deleting cart item", 500));
    }
});
