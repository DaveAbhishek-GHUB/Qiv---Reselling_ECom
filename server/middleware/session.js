const session = require('express-session');

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
});

module.exports = sessionMiddleware; 