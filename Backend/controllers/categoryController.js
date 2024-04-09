const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.addNewCategory = asyncErrorHandler(async (req, res, next) => {
    // Extracting name from the body and image path from the file uploaded
    const { name } = req.body;
    let imagePath;

    // Check if image file is uploaded
    if (req.file) {
        imagePath = req.file.path;
    }

    // Check if category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        return next(new ErrorHandler('Category already exists', 400));
    }

    // Creating a new category with name and image path
    const category = await Category.create({
        name,
        image: imagePath // This will be null if no image was uploaded
    });

    res.status(201).json({
        success: true,
        message: 'Category added successfully',
        category
    });
});

// Delete Category - Admin
exports.deleteCategory = asyncErrorHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    // Check if category exists
    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }

    // Deleting the category
    await category.remove();

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
    });
});

// Get All Categories
exports.getAllCategories = asyncErrorHandler(async (req, res, next) => {
    const categories = await Category.find();

    res.status(200).json({
        success: true,
        categories
    });
});


// exports.getCategoryProductCounts = asyncErrorHandler(async (req, res, next) => {
//     const categoriesWithProductCounts = await Category.aggregate([
//         {
//             $lookup: {
//                 from: 'products', // the collection to join
//                 localField: '_id', // field from the categories collection
//                 foreignField: 'category', // field from the products collection matching 'category' field in categories
//                 as: 'products' // array field in the aggregated result
//             }
//         },
//         {
//             $project: {
//                 name: 1,
//                 image: 1,
//                 productCount: { $size: "$products" } // Count the number of products in each category
//             }
//         }
//     ]);

//     res.status(200).json({
//         success: true,
//         data: categoriesWithProductCounts
//     });
// });

exports.getCategoryProductCounts = asyncErrorHandler(async (req, res, next) => {
    // Fetch all categories
    const categories = await Category.find();
    // Fetch all products
    const products = await Product.find();

    // Map through each category and count products
    const categoriesWithProductCounts = categories.map(category => {
        const productCount = products.filter(product => product.category === category.name).length;
        return {
            _id: category._id,
            name: category.name,
            image: category.image,
            productCount: productCount // The count of products for the category
        };
    });

    res.status(200).json({
        success: true,
        data: categoriesWithProductCounts
    });
});