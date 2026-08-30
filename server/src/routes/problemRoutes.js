const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

// Public Route: Anyone can view public problems
router.get("/public", (req, res) => {
  res.json({ message: "Public problems list" });
});

// Role-Restricted Route: Only 'citizen' can submit a problem
router.post("/", protect, authorize("citizen"), async (req, res) => {
  // req.user contains the authenticated citizen's data
  res.status(201).json({ message: "Problem submitted successfully" });
});

// Role-Restricted Route: Only 'hei' or 'hei_admin' can claim problems
router.post(
  "/:id/claim",
  protect,
  authorize("hei", "hei_admin"),
  async (req, res) => {
    res.json({ message: "Problem claimed by institution" });
  },
);

// Role-Restricted Route: Only 'government_admin' or 'govt_admin' can moderate
router.patch(
  "/:id/moderate",
  protect,
  authorize("government_admin", "govt_admin", "platform_admin"),
  async (req, res) => {
    res.json({ message: "Problem status updated by admin" });
  },
);

module.exports = router;
