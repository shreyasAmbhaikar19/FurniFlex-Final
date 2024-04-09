const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter category name"],
        trim: true,
        unique: true 
    },
    image: {
        type: String, 
        required: [true, "Please add an image for the category"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Category', categorySchema);
