const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        require: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    text: {
        type: String,
        require: true
    },
    create_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    }
});

MessageSchema.index({ conversation: 1, sender: 1 });

module.exports = mongoose.model('Message', MessageSchema)
