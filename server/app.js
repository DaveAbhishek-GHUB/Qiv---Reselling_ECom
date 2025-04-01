const express = require('express');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

// Then import MongoDB connection
const db = require('./config/mongodbConnections');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));