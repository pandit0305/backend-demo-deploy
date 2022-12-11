const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    category:[],
    userId: String,
});

const noteModel = mongoose.model("note", noteSchema);

module.exports = {noteModel};