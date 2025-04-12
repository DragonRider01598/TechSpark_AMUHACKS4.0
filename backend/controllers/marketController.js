const Market = require('../models/Market');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const User = require('../models/User');

exports.getAllMarkets = async (req, res) => {
    try {
        const markets = await Market.find();
        res.status(200).json(markets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching markets', error });
    }
};

exports.getVendorDetailsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product and populate vendor details along with user details
    const product = await Product.findById(productId).populate({
      path: 'vendorId',
      populate: {
        path: 'userId',
        model: 'User'
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const vendor = product.vendorId;
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({
      vendor: vendor,
      user: vendor.userId // Full user details
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};