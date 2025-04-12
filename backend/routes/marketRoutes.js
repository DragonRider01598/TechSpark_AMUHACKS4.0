const express = require('express');
const router = express.Router();
const { getAllMarkets, getVendorDetailsByProductId } = require('../controllers/marketController');

router.get('/', getAllMarkets);
router.get('/id/:productId', getVendorDetailsByProductId);

module.exports = router;