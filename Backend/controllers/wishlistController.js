const Wishlist = require('../models/wishlistModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.addToWishlist = asyncErrorHandler(async (req, res, next) => {
    try {
        const { product } = req.body;
        const user = req.user;
        const update = {
            product,
            updated: Date.now()
        };
        const query = { product: update.product, user: user._id };

        const updatedWishlist = await Wishlist.findOneAndUpdate(query, update, {
            new: true
        });

        if (updatedWishlist !== null) {
            res.status(200).json({
                success: true,
                message: 'Your Wishlist has been updated successfully!',
                wishlist: updatedWishlist
            });
        } else {
            const wishlist = new Wishlist({
                product,
                user: user._id
            });

            const wishlistDoc = await wishlist.save();

            res.status(200).json({
                success: true,
                message: `Added to your Wishlist successfully!`,
                wishlist: wishlistDoc
            });
        }
    } catch (error) {
        return next(new ErrorHandler('Your request could not be processed. Please try again.', 400));
    }
});

exports.getWishlist = asyncErrorHandler(async (req, res, next) => {
    try {
        const user = req.user._id;

        const wishlist = await Wishlist.find({ user })
            .populate({
                path: 'product',
                select: 'name price imageUrl'
            })
            .sort('-updated');

        res.status(200).json({
            wishlist
        });
    } catch (error) {
        // Use the ErrorHandler to create a structured error response
        next(new ErrorHandler('Your request could not be processed. Please try again.', 400));
    }
});

  