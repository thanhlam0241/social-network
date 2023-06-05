const mongoose = require('mongoose');

const messageSchema = require('./message');

const ConversationSchema = new mongoose.Schema({
    create_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    isGroup: {
        type: Boolean,
        default: false,
        required: true
    },
    last_message: {
        type: messageSchema.schema,
        require: false
    }
});

module.exports = mongoose.model('Conversation', ConversationSchema)