const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
});

const userModel = mongoose.model("userCred", userSchema);

module.exports = {userModel};