const express = require('express');
const { register, login, logout, authenticate } = require('../controllers/authControllers');
const multer = require('multer')
const path = require("path");
const router = express.Router();

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

router.get('/', authenticate);
router.post('/register', upload.single('profilePicture'), register);
router.post('/login', login);
router.delete('/logout', logout);

module.exports = router;