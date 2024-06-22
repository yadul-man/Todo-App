// mongodb+srv://admin:admin@cluster0.wkozptn.mongodb.net/

const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo,
};
