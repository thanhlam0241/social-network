const mongoose = require('mongoose')

const emotionCommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    emoji: {
        type: String,
    },
    inComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
})

module.exports = mongoose.model('EmotionComment', emotionCommentSchema)