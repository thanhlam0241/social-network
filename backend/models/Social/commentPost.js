const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    created: {
        type: Date,
        default: Date.now
    },
    inPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    photos:
    {
        type: String,
        required: false
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    emotions: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        emoji: {
            type: String,
        }
    }]
})

commentSchema.pre('remove', async function (next) {
    this.model('CommentReply').deleteMany({ inComment: this._id }, next)
    this.model('EmotionComment').deleteMany({ inComment: this._id }, next)
})

module.exports = mongoose.model('CommentPost', commentSchema)