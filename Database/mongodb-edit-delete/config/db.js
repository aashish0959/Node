const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/mongodb");

const db = mongoose.connection;

db.once('open', (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Database connected successfully");
});
module.exports = db;