const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/sendToken');
const sendEmail = require('../utils/sendEmail');
const SearchFeatures = require('../utils/searchFeatures');
const crypto = require('crypto');
const bcrypt = require('bcryptjs')

// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const user = await User.create({
        firstName, 
        lastName,
        email,
        password,
        phoneNumber  
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 201, res);
});

// Logout User
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get User Details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Forgot Password
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const resetPasswordUrl = `https://${req.get("host")}/password/reset/${resetToken}`;

    // const message = `Your password reset token is : \n\n ${resetPasswordUrl}`;

    try {
        await sendEmail({
            email: user.email,
            templateId: process.env.SENDGRID_RESET_TEMPLATEID,
            data: {
                reset_url: resetPasswordUrl
            }
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
});

// Reset Password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {

    // create hash token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user) {
        return next(new ErrorHandler("Invalid reset password token", 404));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});

// Update Password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(currentPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Current Password is Invalid", 400));
    }

    user.password = newPassword;
    await user.save();
    sendToken(user, 201, res);
});

// Update User Profile
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {

    const newUserData = {   
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    }

    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
    });
});

// ADMIN DASHBOARD

// Get All Users --ADMIN
exports.getPaginatedFilteredUsers = asyncErrorHandler(async (req, res, next) => {
    const resultPerPage = Number(req.query.limit) || 5;
    const currentPage = Number(req.query.page) || 1;
    const keyword = req.query.keyword
        ? {
              $or: [
                  { firstName: { $regex: req.query.keyword, $options: "i" } },
                  { lastName: { $regex: req.query.keyword, $options: "i" } },
                  { email: { $regex: req.query.keyword, $options: "i" } },
                  { role: { $regex: req.query.keyword, $options: "i" } }
              ]
          }
        : {};

    const userCount = await User.countDocuments({ ...keyword });
    const searchFeature = new SearchFeatures(User.find(keyword), req.query)
        .filter()
        .pagination(resultPerPage);

    let users = await searchFeature.query;
    let filteredUsersCount = users.length;

    res.status(200).json({
        success: true,
        users,
        userCount,
        resultPerPage,
        currentPage,
        filteredUsersCount,
        totalPages: Math.ceil(userCount / resultPerPage),
    });
});

// Get Single User Details --ADMIN
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role --ADMIN
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {

    const newUserData = {
        role: req.body.role,
    }

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});


// Delete User --ADMIN
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }

    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    });
});
