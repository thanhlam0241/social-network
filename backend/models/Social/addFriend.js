const mongoose = require('mongoose');

const addFriendSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        default: ''
    }
});

addFriendSchema.index({ sender: 1, receiver: 1 }, { unique: true });

addFriendSchema.query.listAddFriendRequests = function (userId) {
    return this.find({ receiver: userId }).populate('sender').select('sender text');
}

module.exports = mongoose.model('FriendRequest', addFriendSchema);