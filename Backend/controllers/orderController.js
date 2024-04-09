const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
const SearchFeatures = require('../utils/searchFeatures');
require('dotenv').config({ path: './config/.env' });

const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});

exports.createPaymentOrder = asyncErrorHandler(async (req, res, next) => {
    const { totalPrice } = req.body; 

    const options = {
      amount: totalPrice * 100, 
      currency: "INR",
      receipt: "receipt#1",
    };
  
    try {
      const order = await razorpayInstance.orders.create(options);
      res.json(order);
    } catch (error) {
      return next(new ErrorHandler(error.description, 500));
    }
  });

exports.createNewOrder = asyncErrorHandler(async (req, res, next) => {
    const {
      user,
      shippingInfo,
      orderItems,
      paymentInfo,
      totalPrice
    } = req.body;
  
    const order = await Order.create({
      user,
      shippingInfo,
      orderItems,
      paymentInfo,
      totalPrice,
      paidAt: Date.now(),
      orderStatus: "Pending"
    });
  
    res.status(201).json({
      success: true,
      order
    });
  });

// Get Single Order Details
exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});


// Get Logged In User Orders
exports.myOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id }).populate("user", "name");

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
});


// Get All Orders ---ADMIN
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find().populate("user", "firstName lastName");

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});

// exports.getPaginatedFilteredOrders = asyncErrorHandler(async (req, res, next) => {
//     const resultPerPage = Number(req.query.limit) || 4;
//     const currentPage = Number(req.query.page) || 1;
    
//     const keyword = req.query.keyword
//         ? {
//             $or: [
//                 { 'orderItems.name': { $regex: req.query.keyword, $options: 'i' } },
//                 { 'user.firstName': { $regex: req.query.keyword, $options: 'i' } },
//                 { 'user.lastName': { $regex: req.query.keyword, $options: 'i' } },
//             ]
//         }
//         : {};
    
//     const ordersCount = await Order.countDocuments({ ...keyword });
//     const searchFeature = new SearchFeatures(Order.find(keyword).populate('user'), req.query)
//         .pagination(resultPerPage);
    
//     let orders = await searchFeature.query;
//     let filteredOrdersCount = orders.length;

//     res.status(200).json({
//         success: true,
//         orders,
//         ordersCount,
//         resultPerPage,
//         currentPage,
//         filteredOrdersCount,
//         totalPages: Math.ceil(ordersCount / resultPerPage),
//     });
// });

exports.getPaginatedFilteredOrders = asyncErrorHandler(async (req, res, next) => {
    const resultPerPage = Number(req.query.limit) || 4;
    const currentPage = Number(req.query.page) || 1;
    
    let aggregationPipeline = [
        {
            $lookup: {
                from: 'users', // This should match the collection name of User in MongoDB
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user' // Flatten the user array to make it easier to query against
        },
    ];

    if (req.query.keyword) {
        aggregationPipeline.push({
            $match: {
                $or: [
                    { 'orderItems.name': { $regex: req.query.keyword, $options: 'i' } },
                    { 'user.firstName': { $regex: req.query.keyword, $options: 'i' } },
                    { 'user.lastName': { $regex: req.query.keyword, $options: 'i' } },
                    { 'createdAt': { $regex: req.query.keyword, $options: 'i' } },
                    { 'orderStatus': { $regex: req.query.keyword, $options: 'i' } },
                ]
            }
        });
    }

    aggregationPipeline.push(
        { $sort: { createdAt: -1 } }
    );

    const ordersCount = await Order.aggregate([...aggregationPipeline, { $count: "totalOrders" }]);
    const totalOrders = ordersCount.length > 0 ? ordersCount[0].totalOrders : 0;

    // Add pagination to aggregation
    aggregationPipeline.push(
        { $skip: (currentPage - 1) * resultPerPage },
        { $limit: resultPerPage }
    );

    let orders = await Order.aggregate(aggregationPipeline);

    res.status(200).json({
        success: true,
        orders,
        ordersCount: totalOrders,
        resultPerPage,
        currentPage,
        filteredOrdersCount: orders.length,
        totalPages: Math.ceil(totalOrders / resultPerPage),
    });
});


// Update Order Status ---ADMIN
exports.updateOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Already Delivered", 400));
    }

    if (req.body.status === "Shipped") {
        order.shippedAt = Date.now();
        order.orderItems.forEach(async (i) => {
            await updateStock(i.product, i.quantity)
        });
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

// Delete Order ---ADMIN
exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});


exports.getTotalRevenue = asyncErrorHandler(async (req, res, next) => {
    const aggregationPipeline = [
        {
            $match: {
                orderStatus: "Delivered" // Match only delivered orders
            }
        },
        {
            $group: {
                _id: null, // Group all matching documents together (since we want total revenue)
                totalRevenue: { $sum: "$totalPrice" } // Sum up the totalPrice of all matched documents
            }
        }
    ];

    const result = await Order.aggregate(aggregationPipeline);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
        success: true,
        totalRevenue
    });
});

exports.getWeeklyOrderSummary = asyncErrorHandler(async (req, res, next) => {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const aggregationPipeline = [
        {
            $match: {
                createdAt: { $gte: lastWeek },
                orderStatus: { $in: ["Pending", "Shipped", "Delivered"] }
            }
        },
        {
            $group: {
                _id: { $dayOfWeek: "$createdAt" },
                numberOfOrders: { $sum: 1 },
                totalRevenue: { $sum: "$totalPrice" }
            }
        },
        {
            $sort: { "_id": 1 }
        }
    ];

    const result = await Order.aggregate(aggregationPipeline);
    res.status(200).json({
        success: true,
        data: result
    });
});
