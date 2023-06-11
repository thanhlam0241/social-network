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
    photos:
    {
        type: String,
        required: false
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    inComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentPost'
    },
    emotions: [mongoose.Schema.Types.ObjectId]
})

commentSchema.pre('remove', async function (next) {
    this.model('EmotionComment').deleteMany({ inComment: this._id }, next)
})

module.exports = mongoose.model('CommentReply', commentSchema)