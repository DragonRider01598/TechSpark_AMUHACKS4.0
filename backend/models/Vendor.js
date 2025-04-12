const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   marketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Market', required: true },
   shopName: { type: String, required: true },
   location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true }
   },
   images: [{ type: String ,required:false}], // Paths to images
   averageRating: { type: Number, default: 0 },
   phone: { type: String, default: null },
   createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vendor', vendorSchema);