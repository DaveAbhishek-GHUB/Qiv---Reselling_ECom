const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { handleGoogleLogin } = require('../controllers/googleAuthController');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }, async function(accessToken, refreshToken, profile, done) {
        try {
            const { user, token } = await handleGoogleLogin(profile);
            user.token = token; // Add token to user object for use in callback
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});