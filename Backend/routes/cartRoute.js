const express = require('express');
const { createCartItems, getAllCartItems, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/carts').post(createCartItems);
// router.route('/carts').post(isAuthenticatedUser, createCartItem);
router.route('/carts/user/:userId').get(getAllCartItems);
// router.route('/carts/user/:userId').get(isAuthenticatedUser, getAllCartItems);
router.route('/carts/:cartId')
    .put(isAuthenticatedUser, updateCartItem)
    .delete(isAuthenticatedUser, deleteCartItem);

module.exports = router;
