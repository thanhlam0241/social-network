const mongoose = require('mongoose');

const conversationWithFriendSchema = new mongoose.Schema({
    create_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
        require: true
    }],
    last_message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        require: false
    }
});

module.exports = mongoose.model('ConversationWithFriend', conversationWithFriendSchema)