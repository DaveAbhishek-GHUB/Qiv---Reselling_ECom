const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const setupMiddleware = require('./middleware');

// Load environment variables first
dotenv.config();

// Then import MongoDB connection
const db = require('./config/mongodbConnections');
// Import passport config
require('./config/googleStrategy');

const port = process.env.PORT || 3000;
const app = express();

// Setup all middleware
setupMiddleware(app);

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));