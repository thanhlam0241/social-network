const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    avatar: {
        type: String,
        require: false
    },
    faceId: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', UserSchema)