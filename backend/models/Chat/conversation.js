const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    create_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    groupName: {
        type: String,
        require: false
    },
    lastMessage: {
        type: String,
        require: true,
        default: 'Now you are connected on chat'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }]
});

module.exports = mongoose.model('Conversation', ConversationSchema)