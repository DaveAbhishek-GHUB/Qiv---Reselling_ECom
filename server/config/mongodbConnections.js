const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGODB_URI}`);
let db = mongoose.connection;
db.once("open", function(){
    console.log("connected");
});

module.exports = db;