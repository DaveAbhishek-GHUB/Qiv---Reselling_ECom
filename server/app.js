const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
// Load environment variables first
dotenv.config();

// Then import MongoDB connection
const db = require('./config/mongodbConnections');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));