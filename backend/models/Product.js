const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  marketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Market', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Fruits, Vegetables, Dairy, Grains
  price: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., kg, liter, dozen
  stock: {
    type: String,
    enum: ['in stock', 'low stock', 'out of stock'],
    default: 'in stock' // Set default to 'in stock'
  },
  images: { type: [String], required:false }, // Paths to images
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);