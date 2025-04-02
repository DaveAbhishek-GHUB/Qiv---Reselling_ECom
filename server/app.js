const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const passport = require('passport');
const session = require('express-session');
// Load environment variables first
dotenv.config();

// Then import MongoDB connection
const db = require('./config/mongodbConnections');
// Import passport config
require('./config/googleStrategy');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Initialize session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));