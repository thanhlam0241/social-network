const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now(),
        expires: 60 * 60 * 24 * 7
    }
});

module.exports = mongoose.model('Token', TokenSchema)
