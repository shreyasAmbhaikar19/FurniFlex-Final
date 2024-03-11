const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { isAuthenticatedUser} = require('../middlewares/auth');

const router = express.Router();

router.route('/wishlist').post(isAuthenticatedUser, addToWishlist)
    .get(isAuthenticatedUser, getWishlist);
router.route('/wishlist/remove').post(isAuthenticatedUser, removeFromWishlist);

module.exports = router;