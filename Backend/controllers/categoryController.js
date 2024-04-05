const Category = require('../models/categoryModel');
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
