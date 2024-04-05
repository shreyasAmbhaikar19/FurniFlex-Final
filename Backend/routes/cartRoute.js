const express = require('express');
const { createCartItems, getAllCartItems, deleteCartItem, updateCartItem } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/carts').post(isAuthenticatedUser, createCartItems);
router.route('/carts/user/:userId').get(isAuthenticatedUser, getAllCartItems);
router.route('/cart/:cartId').patch(isAuthenticatedUser, updateCartItem)
    .delete(isAuthenticatedUser, deleteCartItem);

module.exports = router;
