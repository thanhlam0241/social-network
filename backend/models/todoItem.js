const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    important: {
        type: Boolean,
        required: true,
        default: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    username: {
        type: String,
        required: true,
        index: true
    }
});

module.exports = mongoose.model('TodoItem', TodoItemSchema)