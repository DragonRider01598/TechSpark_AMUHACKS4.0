const express = require('express');
const { register, login, logout, authenticate } = require('../controllers/authControllers');
const { upload } = require('../utils/multer');
const router = express.Router();

router.get('/', authenticate); // Authentication route
router.post('/register', upload.single('profilePicture'), register); // Registration with image upload
router.post('/login', login); // Login Route
router.delete('/logout', logout); // Logout Route

module.exports = router;