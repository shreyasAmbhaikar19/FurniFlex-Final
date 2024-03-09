const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    default: null
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
