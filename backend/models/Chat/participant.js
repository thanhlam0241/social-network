const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

ParticipantSchema.index({ conversation: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Participant', ParticipantSchema)