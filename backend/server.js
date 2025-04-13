const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

const allowedOrigins = [
   process.env.FRONTEND_URL,
];

// CORS configuration
app.use(cors({
   origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
      } else {
         callback(new Error("Not allowed by CORS"));
      }
   },
   credentials: true, // Allow credentials (cookies) with cross-origin requests
   allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Serve static image files
app.use('/api/images', express.static('images'));

// Connect Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vendors", require("./routes/vendorRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/markets", require("./routes/marketRoutes"));

// Endpoint to check if server is online
app.use('/online', (req, res) => { return res.status(200).send('Server is online') })

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));