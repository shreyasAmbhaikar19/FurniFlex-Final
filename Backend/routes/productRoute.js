const express = require('express');
const { getSearchPaginatedFilteredProducts, getSingleProduct, updateProduct, deleteProduct, getProductReviews, deleteReview, createProductReview, createProduct, getAdminProducts, getAllProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const upload = require('../utils/multer'); 

const router = express.Router();

router.route('/products/all').get(getAllProducts);
router.route('/products').get(getSearchPaginatedFilteredProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"),upload, createProduct);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route('/admin/product/:id')
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route('/admin/product/:productId/reviews')
    .get(isAuthenticatedUser, authorizeRoles("admin"), getProductReviews)

router.route('/admin/product/:productId/review/:reviewId')
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

module.exports = router;



