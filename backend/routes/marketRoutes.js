const express = require('express');
const router = express.Router();
const { getVendorDetailsByProductId } = require('../controllers/marketController');

router.get('/id/:productId', getVendorDetailsByProductId); // GET vendor details by product ID

module.exports = router;