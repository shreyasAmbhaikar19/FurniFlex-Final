// const express = require('express');
// const { getAllCategories, deleteCategory, addNewCategory } = require('../controllers/categoryController');
// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
// const {uploadSingle} = require('../utils/multer');

// const router = express.Router();

// router.route('/categories').get(getAllCategories);
// router.route('/admin/category/new').post(isAuthenticatedUser, authorizeRoles("admin"), uploadSingle, addNewCategory);
// router.route('/admin/category/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

// module.exports = router;


const express = require('express');
const { getAllCategories, deleteCategory, addNewCategory, getCategoryProductCounts } = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const upload = require('../utils/multer');

const router = express.Router();

router.get('/categories', getAllCategories);
router.post('/admin/category/new', isAuthenticatedUser, authorizeRoles("admin"), upload.single('image'), addNewCategory);
router.delete('/admin/category/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);
router.get('/categories/product-counts', getCategoryProductCounts);

module.exports = router;

