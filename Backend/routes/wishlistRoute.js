const express = require('express');
const { addToWishlist, getWishlist } = require('../controllers/wishlistController');
const { isAuthenticatedUser} = require('../middlewares/auth');

const router = express.Router();

router.route('/wishlist').post(isAuthenticatedUser, addToWishlist)
    .get(isAuthenticatedUser, getWishlist);

module.exports = router;