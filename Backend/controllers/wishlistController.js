const Wishlist = require('../models/wishlistModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.addToWishlist = asyncErrorHandler(async (req, res, next) => {
    const { product } = req.body;
    const user = req.user._id;

    let wishlistItem = await Wishlist.findOne({ product, user });

    if (wishlistItem) {
        return res.status(400).json({
            success: false,
            message: 'Product is already in your Wishlist!',
        });
    } else {
        wishlistItem = new Wishlist({
            product,
            user,
        });

        await wishlistItem.save();

        return res.status(200).json({
            success: true,
            message: 'Product added to your Wishlist successfully!',
            wishlist: wishlistItem,
        });
    }
});

exports.removeFromWishlist = asyncErrorHandler(async (req, res, next) => {
    const { product } = req.body;
    const user = req.user._id;

    const result = await Wishlist.findOneAndRemove({ product, user });

    if (result) {
        return res.status(200).json({
            success: true,
            message: 'Product removed from your Wishlist successfully!',
        });
    } else {
        return next(new ErrorHandler('Product not found in your Wishlist.', 404));
    }
});

exports.getWishlist = asyncErrorHandler(async (req, res, next) => {
    const user = req.user._id;

    const wishlistItems = await Wishlist.find({ user })
        .populate({
            path: 'product',
            select: 'name subscriptions brand images discount ratings',
        });

    res.status(200).json({
        success: true,
        wishlist: wishlistItems,
    });
});
