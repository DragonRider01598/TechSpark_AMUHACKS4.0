const Vendor = require('../models/Vendor');
const Market = require('../models/Market');


exports.createVendor = async (req, res) => {
  try {
    const { userId, marketId, shopName, address, latitude, longitude, phone } = req.body;

    // Check if a vendor profile already exists for this userId
    const existingVendor = await Vendor.findOne({ userId });

    if (existingVendor) {
      return res.status(400).json({error: "Vendor profile already exists for this user."});
    }

    const obj = {
      userId,
      marketId,
      shopName,
      phone,
      location: { latitude, longitude, address },
      // images: req.files?.map(file => file.path)
    };

    console.log(obj);
    const vendor = new Vendor(obj);
    await vendor.save();

    res.status(201).json({ message: "Vendor profile created successfully", vendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    // const vendors = await Vendor.find().populate('Product');
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMarkets = async (req, res) => {
  try {
    const markets = await Market.find();
    res.json(markets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rateVendor = async (req, res) => {
  try {
    const { userId, vendorId, rating } = req.body;
    const existingRating = await Rating.findOne({ userId, vendorId });
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({ message: 'Rating updated successfully' });
    }
    const newRating = new Rating({ userId, vendorId, rating });
    await newRating.save();
    res.status(201).json({ message: 'Rating added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};