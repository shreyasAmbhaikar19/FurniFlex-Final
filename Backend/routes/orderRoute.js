const express = require('express');
const { createNewOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder, createPaymentOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/payment/order').post(isAuthenticatedUser, createPaymentOrder);

router.route('/order/new').post(isAuthenticatedUser, createNewOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetails);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;


// const express = require('express');
// const { newOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder, createRazorpayOrder, verifyPayment } = require('../controllers/orderController');
// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// const router = express.Router();

// router.post('/create-razorpay-order', isAuthenticatedUser, newOrder, createRazorpayOrder);
// router.post('/verify-payment', isAuthenticatedUser, verifyPayment);

// router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetails);
// router.route('/orders/me').get(isAuthenticatedUser, myOrders);

// router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// router.route('/admin/order/:id')
//     .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
//     .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

// module.exports = router;





// key_id: 'rzp_test_UV0yVg8Z0GnpDy',
// key_secret: '5cvXi39qYKCLmddG3nKS1yP3'