const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db=mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => { console.log("error in mongodb", err); });

module.exports = db;