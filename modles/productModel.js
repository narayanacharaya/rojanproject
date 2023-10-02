const mongoose = require("mongoose");

const User = require('./userModel');
const { Schema } = mongoose;
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref: 'User',
           },
   },
  {
    timestamps: true,
  }
)

const productModel = new mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Use the model name 'User' here
     required: true
  },
  
  
  price: {
    type: Number,
    required: true
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  numnberofenroll:{
    type:Number,
    required:true,
    default:0
  }
 
} ,{
  timestamps: true 
});

module.exports = mongoose.model('Product', productModel);