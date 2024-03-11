// const Wishlist = require('../models/wishlistModel');
// const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
// const ErrorHandler = require('../utils/errorHandler');

// exports.addToWishlist = asyncErrorHandler(async (req, res, next) => {
//     try {
//         const { product } = req.body;
//         const user = req.user;
//         const update = {
//             product,
//             updated: Date.now()
//         };
//         const query = { product: update.product, user: user._id };

//         const updatedWishlist = await Wishlist.findOneAndUpdate(query, update, {
//             new: true
//         });

//         if (updatedWishlist !== null) {
//             res.status(200).json({
//                 success: true,
//                 message: 'Your Wishlist has been updated successfully!',
//                 wishlist: updatedWishlist
//             });
//         } else {
//             const wishlist = new Wishlist({
//                 product,
//                 user: user._id
//             });

//             const wishlistDoc = await wishlist.save();

//             res.status(200).json({
//                 success: true,
//                 message: `Added to your Wishlist successfully!`,
//                 wishlist: wishlistDoc
//             });
//         }
//     } catch (error) {
//         return next(new ErrorHandler('Your request could not be processed. Please try again.', 400));
//     }
// });

// exports.getWishlist = asyncErrorHandler(async (req, res, next) => {
//     try {
//         const user = req.user._id;

//         const wishlist = await Wishlist.find({ user })
//             .populate({
//                 path: 'product',
//                 select: 'name price brand  images'
//             })
//             .sort('-updated');

//         res.status(200).json({
//             wishlist
//         });
//     } catch (error) {
//         // Use the ErrorHandler to create a structured error response
//         next(new ErrorHandler('Your request could not be processed. Please try again.', 400));
//     }
// });


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
            select: 'name subscriptions brand images',
        });

    res.status(200).json({
        success: true,
        wishlist: wishlistItems,
    });
});
