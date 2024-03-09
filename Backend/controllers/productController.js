const Product = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Get All Products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Products by Search, Filter, Pagination
exports.getSearchPaginatedFilteredProducts = asyncErrorHandler(async (req, res, next) => {

    // const resultPerPage = 3;
    const resultPerPage = Number(req.query.limit) || 3;

    const productsCount = await Product.countDocuments();
    // console.log(req.query);

    const searchFeature = new SearchFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(resultPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// Get Product Details
exports.getSingleProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Create OR Update Reviews
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
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

// Create Product ---ADMIN
exports.createProduct = asyncErrorHandler(async (req, res, next) => {

    // let images = [];
    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // const imagesLink = [];

    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: "products",
    //     });

    //     imagesLink.push({
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     });
    // }

    // req.body.images = imagesLink;
    
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
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


// Update Product ---ADMIN
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // if (req.body.images !== undefined) {
    //     let images = [];
    //     if (typeof req.body.images === "string") {
    //         images.push(req.body.images);
    //     } else {
    //         images = req.body.images;
    //     }
    //     for (let i = 0; i < product.images.length; i++) {
    //         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    //     }

    //     const imagesLink = [];

    //     for (let i = 0; i < images.length; i++) {
    //         const result = await cloudinary.v2.uploader.upload(images[i], {
    //             folder: "products",
    //         });

    //         imagesLink.push({
    //             public_id: result.public_id,
    //             url: result.secure_url,
    //         });
    //     }
    //     req.body.images = imagesLink;
    // }


    req.body.user = req.user.id;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        product
    });
});


// Delete Product ---ADMIN
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(`Product doesn't exist with id: ${req.params.id}`, 404));
    }

     // for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
    });
});

// Get All Reviews of Product
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {

    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

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