const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const { requestPasswordReset, verifyOTPAndResetPassword } = require("../controllers/passwordResetController");
const { sendOTPEmail } = require("../utils/emailService");

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Password reset routes
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", verifyOTPAndResetPassword);

// Test email route (remove in production)
router.get("/test-email", async (req, res) => {
  try {
    const testEmail = req.query.email || process.env.EMAIL_USER;
    const result = await sendOTPEmail(testEmail, "123456");
    
    if (result.success) {
      res.status(200).json({ message: "Test email sent successfully" });
    } else {
      res.status(500).json({ error: "Failed to send test email", details: result.error });
    }
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
