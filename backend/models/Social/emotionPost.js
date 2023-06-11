const mongoose = require('mongoose')

const emotionPostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    emoji: {
        type: String,
    },
    inPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
})

module.exports = mongoose.model('EmotionPost', emotionPostSchema)