const Product = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');

// Get All Products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Products by Search, Filter, Pagination
// exports.getSearchPaginatedFilteredProducts = asyncErrorHandler(async (req, res, next) => {

//     // const resultPerPage = 3;
//     const resultPerPage = Number(req.query.limit) || 3;

//     const productsCount = await Product.countDocuments();
//     // console.log(req.query);

//     const searchFeature = new SearchFeatures(Product.find(), req.query)
//         .search()
//         .filter();

//     let products = await searchFeature.query;
//     let filteredProductsCount = products.length;

//     searchFeature.pagination(resultPerPage);

//     products = await searchFeature.query.clone();

//     res.status(200).json({
//         success: true,
//         products,
//         productsCount,
//         resultPerPage,
//         filteredProductsCount,
//     });
// });

// exports.getSearchPaginatedFilteredProducts = asyncErrorHandler(async (req, res, next) => {
//     const resultPerPage = Number(req.query.limit) || 4;
//     const currentPage = Number(req.query.page) || 1;

//     const keyword = req.query.keyword
//     ? {
//           $or: [
//               { name: { $regex: req.query.keyword, $options: "i" } },
//               { brand: { $regex: req.query.keyword, $options: "i" } },
//               { category: { $regex: req.query.keyword, $options: "i" } }
//           ]
//       }
//     : {};

//     const productCount = await Product.countDocuments({ ...keyword });
//     const searchFeature = new SearchFeatures(Product.find(keyword), req.query)
//         .filter()
//         .pagination(resultPerPage);

//     let products = await searchFeature.query;
//     let filteredProductsCount = products.length;

//     res.status(200).json({
//         success: true,
//         products,
//         productCount,
//         resultPerPage,
//         currentPage,
//         filteredProductsCount,
//         totalPages: Math.ceil(productCount / resultPerPage),
//     });
// });


exports.getSearchPaginatedFilteredProducts = asyncErrorHandler(async (req, res, next) => {
    const resultPerPage = Number(req.query.limit) || 8;
    const currentPage = Number(req.query.page) || 1;
    const category = req.query.category ? { category: req.query.category } : {};

    const keyword = req.query.keyword
        ? {
            $or: [
                { name: { $regex: req.query.keyword, $options: "i" } },
                { brand: { $regex: req.query.keyword, $options: "i" } },
                { category: { $regex: req.query.keyword, $options: "i" } }
            ]
        }
        : {};

    const productCount = await Product.countDocuments({ ...keyword, ...category });

    const searchFeature = new SearchFeatures(Product.find({ ...keyword, ...category })
    .sort({ createdAt: -1 }), req.query)
    .filter()
    .pagination(resultPerPage);


    const products = await searchFeature.query;
    let filteredProductsCount = products.length;

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        currentPage,
        filteredProductsCount,
        totalPages: Math.ceil(productCount / resultPerPage),
    });
});



// Get Product Details
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
                                     .populate('reviews.user', 'name');

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error", 500));
    }
};

// Create OR Update Reviews
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        createdAt: new Date() 
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (isReviewed) {

        product.reviews.forEach((rev) => { 
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating, rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Get All Products ---ADMIN
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

exports.createProduct = asyncErrorHandler(async (req, res, next) => {
    let imagePaths = [];
    if (req.files) {
        imagePaths = req.files.map(file => file.path);
    }

    // Directly parse subscriptions if provided in the request
    let subscriptions = req.body.subscriptions ? JSON.parse(req.body.subscriptions) : [];

    const productData = {
        ...req.body,
        user: req.user.id,
        images: imagePaths,
        subscriptions: subscriptions // Adding parsed subscriptions here
    };

    // Create product with the parsed data
    const product = await Product.create(productData);

    res.status(201).json({
        success: true,
        product
    });
});

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }
  
    let imagePaths = req.files.map(file => file.path);
    
    // Parse existing images from the request
    const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    const updatedImagePaths = existingImages.concat(imagePaths);
  
    // Directly parse subscriptions if provided in the request
    let subscriptions = req.body.subscriptions ? JSON.parse(req.body.subscriptions) : product.subscriptions;
  
    const updatedProductData = {
      ...req.body,
      images: updatedImagePaths,
      subscriptions: subscriptions
    };
  
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedProductData, { new: true, runValidators: true });
  
    res.status(200).json({
      success: true,
      product: updatedProduct
    });
  });

// Delete Product ---ADMIN
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(`Product doesn't exist with id: ${req.params.id}`, 404));
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
    });
});

// Get All Reviews of Product
exports.getProductReviews = async (req, res, next) => {
    try {
        const productId = req.params.id; // Ensure this matches the route param name

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return next(new ErrorHandler("Invalid Product ID format", 400));
        }

        // Fetch the product and populate the reviews with user's firstName and lastName
        const product = await Product.findById(productId).populate({
            path: 'reviews.user',
            select: 'firstName lastName' // Assuming these are the fields in your User model
        });

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        // Map through the reviews to construct the desired response
        const reviewsWithUserDetails = product.reviews.map(review => ({
            ...review._doc,
            user: {
                _id: review.user._id,
                firstName: review.user.firstName,
                lastName: review.user.lastName
            }
        }));

        res.status(200).json({
            success: true,
            reviews: reviewsWithUserDetails
        });
    } catch (error) {
        console.error("Error in getProductReviews:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || "Unknown error"
        });
    }
};

// Delete Reviews
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
    const { productId, reviewId } = req.params;

    if (!productId || !reviewId) {
        return next(new ErrorHandler("Product ID and Review ID are required in the request body", 400));
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        { $pull: { reviews: { _id: reviewId } } },
        { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    let avg = 0;

    product.reviews.forEach(rev => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (product.reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / product.reviews.length;
    }

    const numOfReviews = product.reviews.length;

    // Update the product with the modified reviews array
    await Product.findByIdAndUpdate(productId, {
        ratings: Number(ratings),
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

