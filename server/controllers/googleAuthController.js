const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const handleGoogleLogin = async (profile) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
            // Also check if user exists with same email
            const existingEmailUser = await User.findOne({ email: profile.emails[0].value });
            if (existingEmailUser) {
                // Link Google account to existing user
                existingEmailUser.googleId = profile.id;
                existingEmailUser.authType = 'google';
                user = await existingEmailUser.save();
            } else {
                // Create username from email
                const email = profile.emails[0].value;
                const baseUsername = email.split('@')[0];
                let username = baseUsername;
                let counter = 1;
                
                // Make sure username is unique
                while (await User.findOne({ username })) {
                    username = `${baseUsername}${counter}`;
                    counter++;
                }
                
                // Create new user
                user = await User.create({
                    username,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    authType: 'google'
                });
            }
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email, 
                username: user.username,
                authType: 'google'
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        return { user, token };
    } catch (error) {
        throw error;
    }
};

const googleCallback = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect('/api/auth/callback/failure');
        }

        // Set JWT token in cookie
        res.cookie('token', req.user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Redirect to frontend with success
        res.redirect(process.env.FRONTEND_URL || '/');
    } catch (error) {
        console.error('Google callback error:', error);
        res.redirect('/api/auth/callback/failure');
    }
};

const googleFailure = (req, res) => {
    res.redirect(process.env.FRONTEND_URL + '/login?error=true' || '/login?error=true');
};

module.exports = {
    handleGoogleLogin,
    googleCallback,
    googleFailure
}; 