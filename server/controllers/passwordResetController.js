const { User } = require("../models/userModel");
const { sendOTPEmail } = require("../utils/emailService");
const bcrypt = require("bcrypt");

// Function to generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request password reset
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found with this email address" });
        }

        // Google-authenticated users cannot reset password this way
        if (user.authType === 'google') {
            return res.status(400).json({ 
                error: "This account uses Google Sign-In. Please reset your password through Google."
            });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 15); // OTP valid for 15 minutes

        // Save OTP to user
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpiry = otpExpiry;
        await user.save();

        // Send email
        const emailResult = await sendOTPEmail(email, otp);
        if (!emailResult.success) {
            return res.status(500).json({ error: "Failed to send OTP email. Please try again." });
        }

        res.status(200).json({ 
            message: "OTP sent to your email address",
            email: email
        });
    } catch (error) {
        console.error("Password reset request error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Verify OTP and reset password
const verifyOTPAndResetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Validate input
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ error: "Email, OTP, and new password are required" });
        }

        // Find user
        const user = await User.findOne({ 
            email, 
            resetPasswordOTP: otp,
            resetPasswordOTPExpiry: { $gt: new Date() } // Check if OTP is not expired
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        user.password = hashedPassword;
        user.confirmPassword = hashedPassword;
        user.resetPasswordOTP = null;
        user.resetPasswordOTPExpiry = null;
        await user.save();

        // Generate JWT token for auto login
        const token = await user.generateAuthToken();

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(200).json({ 
            message: "Password has been reset successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    requestPasswordReset,
    verifyOTPAndResetPassword
}; 