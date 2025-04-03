const passport = require('passport');

const initializePassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = initializePassport; 