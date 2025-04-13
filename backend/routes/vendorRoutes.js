const express = require('express');
const { createVendor, getVendors, rateVendor, getMarkets } = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();
const { upload } = require('../utils/multer');

router.post('/', upload.array("files", 5), createVendor); // create a new vendor
router.get('/', getVendors); // GET all vendors
router.post('/rate', authMiddleware, rateVendor); // POST rating for a vendor
router.get('/markets', getMarkets); // GET all markets

module.exports = router;