const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fromUser: {
        type: String,
        required: true
    },
    toUser: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    dateSent: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);