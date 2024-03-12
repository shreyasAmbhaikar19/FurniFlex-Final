const express = require('express');
const { createCartItems, getAllCartItems, deleteCartItem } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/carts').post(createCartItems);
router.route('/carts/user/:userId').get(getAllCartItems);
router.route('/cart/:cartId')
    .delete( deleteCartItem);

module.exports = router;
