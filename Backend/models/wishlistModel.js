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
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
