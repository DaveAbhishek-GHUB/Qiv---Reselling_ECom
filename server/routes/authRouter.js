const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register, login } = require("../controllers/userController");

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Auth Callback
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/api/auth/callback/success',
        failureRedirect: '/api/auth/callback/failure'
    })
);

// Success 
router.get('/callback/success', (req, res) => {
    if (!req.user) {
        return res.redirect('/api/auth/callback/failure');
    }
    console.log('User object:', req.user); 
    const email = req.user.emails?.[0]?.value || 'Email not available';
    const name = req.user.displayName || 'User';
    
    res.send(`Welcome ${name} (${email})`);
});

// failure
router.get('/callback/failure', (req, res) => {
    res.send("Error");
});

module.exports = router;