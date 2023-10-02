const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const product=require('../modles/productModel')
router.post("/", async (req, res) => {
    try {
      // Extract the product data from the request body
      const {
        description,
        thumbnail,
        category,
        name,
        author,
        price,
        reviews,
        rating,
        numReviews,
        numnberofenroll,
      } = req.body;
  
      // Create a new Product instance with the extracted data
      const newProduct = new product({
        _id: new mongoose.Types.ObjectId(),
        description,
        thumbnail,
        category,
        name,
        author, // Make sure "author" is a valid ObjectId referencing a user
        price,
        reviews, // You can provide an empty array or reviews if needed
        rating,
        numReviews,
        numnberofenroll,
      });
  
      // Save the new product to the database
      const savedProduct = await newProduct.save();
  
      // Return the saved product information in the response
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  router.get("/", async (req, res) => {
    try {
      // Find all products and populate the "author" field with user information
      const products = await product
        .find()
        .populate("author", "username email") // Replace with the fields you want to populate
        .exec();
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  router.delete("/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
  
      // Check if the product ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
  
      // Find the product by ID and remove it
      const deletedProduct = await product.findByIdAndRemove(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  module.exports=router