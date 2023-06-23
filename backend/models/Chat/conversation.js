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
        required: false
    },
    last_message: {
        type: messageSchema.schema,
        require: false
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }]
});

module.exports = mongoose.model('Conversation', ConversationSchema)