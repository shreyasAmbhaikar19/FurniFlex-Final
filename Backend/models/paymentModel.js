// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const paymentSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User model if you have one
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   currency: {
//     type: String,
//     required: true,
//   },
//   paymentMethod: {
//     type: String,
//     required: true,
//   },
//   transactionId: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['success', 'failed', 'pending'],
//     default: 'pending',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Payment = mongoose.model('Payment', paymentSchema);

// module.exports = Payment;
