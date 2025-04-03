const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register, login } = require("../controllers/userController");
const { googleCallback, googleFailure } = require("../controllers/googleAuthController");

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
router.get('/callback/success', googleCallback);

// failure
router.get('/callback/failure', googleFailure);

module.exports = router;