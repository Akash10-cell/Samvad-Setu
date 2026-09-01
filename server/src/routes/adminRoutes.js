const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

// Protected Route: Only 'government_admin', 'admin', 'govt_admin', 'platform_admin' can access this
router.get("/verify", protect, authorize("government_admin", "admin", "govt_admin", "platform_admin"), (req, res) => {
  res.json({ message: "Admin access verified", role: req.user.role });
});

module.exports = router;
