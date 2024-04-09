const express = require('express');
const { createNewOrder, getSingleOrderDetails, myOrders, updateOrder, deleteOrder, createPaymentOrder, getPaginatedFilteredOrders, getTotalRevenue, getWeeklyOrderSummary } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/payment/order').post(isAuthenticatedUser, createPaymentOrder);

router.route('/order/new').post(isAuthenticatedUser, createNewOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetails);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getPaginatedFilteredOrders);

router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router.get('/admin/orders/revenue', isAuthenticatedUser, authorizeRoles('admin'), getTotalRevenue);
router.get('/admin/orders/weekly-summary', isAuthenticatedUser, authorizeRoles('admin'), getWeeklyOrderSummary);

module.exports = router;

// key_id: 'rzp_test_UV0yVg8Z0GnpDy',
// key_secret: '5cvXi39qYKCLmddG3nKS1yP3'