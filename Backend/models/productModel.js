const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    discountPercentage: {
        type: Number,
        required: [false, "Please enter discount percentage"], // Made required false assuming not all products may have a discount
        min: [0, "Discount percentage cannot be less than 0"],
        max: [100, "Discount percentage cannot exceed 100"]
    },
    rentDuration: {
        type: Number,
    },
    subscriptions: [
        {
            duration: {
                type: Number,
                required: true
            },
            monthlyPrice: {
                type: Number,
                required: true
            }
        }
    ],
    images: [{ 
        type: String
    }],
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxlength: [4, "Stock cannot exceed limit"],
        default: 1
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
