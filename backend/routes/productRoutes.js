const express = require('express');
const { createProduct, getProducts, updateProduct } = require('../controllers/productController');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { upload } = require('../utils/multer');

router.post('/', upload.single("images"), createProduct); // Create a new product with image upload
router.get('/', getProducts); // GET all products
router.put("/update-stock/:productId", updateProduct); // Update product stock by product ID

module.exports = router;