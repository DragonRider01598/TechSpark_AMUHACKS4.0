const jwt = require("jsonwebtoken");

// Middleware to protect routes by verifying JWT token
const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;// Attach decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (ex) {
    res.cookie('authToken', '', { maxAge: 1 });
    return res.status(400).json({ error: 'Invalid token. Token has been cleared.' });
  }
};

module.exports = authMiddleware;