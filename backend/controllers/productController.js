const Product = require('../models/Product');

// create a product
const createProduct = async (req, res) => {
  try {
    const { vendorId, stock, name, marketId,category, price, unit } = req.body;

    const productImage = req.file ? req.file.path: null;

    const product = new Product({ vendorId, name,marketId,category, price, unit, stock,  images: productImage});
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
      const { productId } = req.params;
      const { stock, price } = req.body; // Get new stock value from request body

      // Find the product by ID and update the stock field
      const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          { stock, price },
          { new: true } // Returns the updated document
      );

      if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
          message: "Stock updated successfully",
          product: updatedProduct,
      });
  } catch (error) {
      console.error("Error updating stock:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createProduct, updateProduct, getProducts };