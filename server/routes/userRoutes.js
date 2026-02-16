const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

console.log("✅ userRoutes loaded");

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({ message: "User route working" });
});

router.get("/hello", (req, res) => {
  res.json({ message: "Hello route works" });
});


// PROFILE ROUTE
router.get("/profile", authMiddleware, async (req, res) => {
  console.log("✅ profile route hit");

  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // 👈 send user directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
