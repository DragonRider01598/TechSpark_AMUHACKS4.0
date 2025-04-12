const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
   marketName: { type: String, required: true },
   location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true }
   },
   createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Market', marketSchema);