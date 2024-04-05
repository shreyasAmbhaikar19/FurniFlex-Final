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


exports.updateCartItem = asyncErrorHandler(async (req, res, next) => {
    const { quantity } = req.body;
    const cartItemId = req.params.cartId;

    if (!quantity) {
        return next(new ErrorHandler("Quantity is required", 400));
    }

    let cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
        return next(new ErrorHandler("Cart item not found", 404));
    }

    // Check if the subscription data is available
    if (!cartItem.subscription || !cartItem.subscription.monthlyPrice) {
        return next(new ErrorHandler("Subscription details are missing", 400));
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = quantity * cartItem.subscription.monthlyPrice * (cartItem.subscription.duration || 1); // Ensure duration is considered and has a fallback of 1

    await cartItem.save();

    res.status(200).json({
        success: true,
        message: 'Cart item updated successfully',
        updatedCartItem: cartItem // Send back the updated cart item
    });
});