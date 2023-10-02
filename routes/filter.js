const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../modles/productModel");

// GET route to find products by name or category
router.get("/", async (req, res) => {
  try {
   
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Use a regular expression to perform a case-insensitive search by name or category
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Search by product name
        { category: { $regex: query, $options: "i" } }, // Search by category
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
