const express = require('express');
const cookieParser = require('cookie-parser');
const corsMiddleware = require('./cors');
const sessionMiddleware = require('./session');
const initializePassport = require('./passport');

const setupMiddleware = (app) => {
    // Basic middleware
    app.use(corsMiddleware);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Session middleware
    app.use(sessionMiddleware);

    // Passport middleware
    initializePassport(app);
};

module.exports = setupMiddleware; 