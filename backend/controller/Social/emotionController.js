const emotionPostSchema = require('../../models/Social/emotionPost');
const emotionCommentSchema = require('../../models/Social/emotionComment');

const numberOfEmotionPerPage = 10;

const getEmotionInPost = async (req, res) => {
    const postId = req.params.id;
    const page = req.query.page;
    try {
        const emotions = await emotionPostSchema.find({ inPost: postId }).populate('emotedBy', '_id name avatar')
            .sort({ created: -1 }).skip((page - 1) * numberOfEmotionPerPage).limit(numberOfEmotionPerPage)
            .select('emotion emotedBy created');
        return res.status(200).json({ emotions });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const getEmotionInComment = async (req, res) => {
    const commentId = req.params.id;
    const page = req.query.page;
    try {
        const emotions = await emotionCommentSchema.find({ inComment: commentId }).populate('emotedBy', '_id name avatar')
            .sort({ created: -1 }).skip((page - 1) * numberOfEmotionPerPage).limit(numberOfEmotionPerPage)
            .select('emotion emotedBy created');
        return res.status(200).json({ emotions });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const updateCommentInPost = async (req, res) => {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const user = req.user;
    const emotion = req.body.emotion;
    try {
        const emotionInPost = await emotionPostSchema.findOne({ inPost: postId, user: user._id });
        if (emotionInPost) {
            if (emotionInPost.emoji === emoji) {
                await emotionInPost.remove();
                return res.status(200).json({ msgs: "Emotion removed successfully" });
            }
            emotionInPost.emotion = emotion;
            await emotionInPost.save();
            return res.status(200).json({ msgs: "Emotion updated successfully" });
        }
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

module.exports = {
    getEmotionInPost,
    getEmotionInComment
}

