const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100
    },
    body: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    photo: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        required: false
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }
    ]
})

postSchema.pre('remove', async function (next) {
    this.model('CommentPost').deleteMany({ inPost: this._id }, next)
    this.model('EmotionPost').deleteMany({ inPost: this._id }, next)
})

module.exports = mongoose.model('Post', postSchema)
