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
    create_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: false,
        required: true
    },
    userInformation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInformation',
        require: true,
        unique: true
    }
});

module.exports = mongoose.model('User', UserSchema)