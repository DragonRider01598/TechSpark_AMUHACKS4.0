const multer = require('multer')
const path = require("path");

// Configure multer storage settings for uploading images
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'images/'); // Set the directory to store images
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Set a unique filename based on timestamp
   }
});

// Set up multer upload settings with file filtering
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

module.exports = { storage, upload };