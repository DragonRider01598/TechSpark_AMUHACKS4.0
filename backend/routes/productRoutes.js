const express = require('express');
const { createProduct, getProducts, updateProduct } = require('../controllers/productController');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const multer = require('multer')
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error("Only images are allowed!"), false);
    }
  }
})

router.post('/', upload.single("images"), createProduct);
router.get('/', getProducts);
router.put("/update-stock/:productId", updateProduct)

module.exports = router;