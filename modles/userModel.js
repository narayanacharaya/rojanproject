const mongoose = require("mongoose");
const Course = require("./productModel")
const transactionSchema = new mongoose.Schema({
  reference_id: String,
  amount: Number,
  status: String,
  timestamp: Date,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  email: String,
  transaction : [transactionSchema],
  phonenumber:Number,
});

module.exports = mongoose.model('User', userSchema);