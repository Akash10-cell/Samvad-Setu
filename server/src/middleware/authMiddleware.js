const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. Verify JWT and attach user to request
const protect = async (req, res, next) => {
  let token;

  // Check for 'Bearer <token>' in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token string
      token = req.headers.authorization.split(" ")[1];

      // Decode token using secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB and attach to req (exclude password)
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};

// 2. Restrict access to specific user roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user?.role}' is not authorized to access this resource`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
