const commentPostSchema = require('../../models/Social/commentPost');
const CommentReply = require('../../models/Social/commentReply');

const fs = require('fs');
const path = require('path');

const numberOfReplyPerPage = 10;
const numberOfCommentPerPage = 10;

// Path: backend\controller\Social\commentController.js
const createCommentInPost = async (req, res) => {
    const user = req.user;
    const postId = req.params.id;
    const { text } = req.body;
    const image = req?.file;
    try {
        const data = {
            text,
            commentedBy: user._id,
            inPost: postId,
            created: Date.now()
        }
        if (image) {
            data.photos = image.filename;
        }
        const comment = await commentPostSchema.create(data);
        return res.status(200).json({ comment });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const getCommentInPost = async (req, res) => {
    const postId = req.params.id;
    const page = req.query.page;
    try {
        const comments = await commentPostSchema.find({ inPost: postId }).populate('commentedBy', '_id name avatar')
            .sort({ created: -1 }).skip((page - 1) * numberOfCommentPerPage).limit(numberOfCommentPerPage)
            .select('text created photos commentedBy emotions');
        return res.status(200).json({ comments });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const deleteCommentInPost = async (req, res) => {
    const user = req.user;
    const commentId = req.params.id;
    try {
        const comment = await commentPostSchema.findById(commentId);
        if (!comment) {
            return res.status(400).json({ msgs: "Comment not found" });
        }
        if (comment.commentedBy.toString() !== user._id.toString()) {
            return res.status(400).json({ msgs: "You are not authorized to delete this comment" });
        }
        await comment.remove();
        return res.status(200).json({ msgs: "Comment deleted successfully" });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const updateCommentInPost = async (req, res) => {
    const user = req.user;
    const commentId = req.params.id;
    const { text } = req.body;
    const image = req.file;
    try {
        const comment = await commentPostSchema.findById(commentId);
        if (!comment) {
            return res.status(400).json({ msgs: "Comment not found" });
        }
        if (comment.commentedBy.toString() !== user._id.toString()) {
            return res.status(400).json({ msgs: "You are not authorized to update this comment" });
        }
        if (image) {
            if (comment.photos) {
                fs.unlink(path.join(__dirname, `../../../uploads/comment/${comment.photos}`), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            comment.photos = image.filename;
        }
        comment.text = text;
        await comment.save();
        return res.status(200).json({ msgs: "Comment updated successfully" });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const createReplyInComment = async (req, res) => {
    const user = req.user;
    const commentId = req.params.id;
    const { text } = req.body;
    const image = req?.file;
    try {
        const data = {
            text,
            repliedBy: user._id,
            inComment: commentId,
            created: Date.now()
        }
        if (image) {
            data.photos = image.filename;
        }
        const reply = await CommentReply.create(data);
        return res.status(200).json({ reply });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const getReplyInComment = async (req, res) => {
    const commentId = req.params.id;
    const page = req.query.page;
    try {
        const replies = await CommentReply.find({ inComment: commentId }).populate('repliedBy', '_id name avatar')
            .sort({ created: -1 }).skip((page - 1) * numberOfReplyPerPage).limit(numberOfReplyPerPage)
            .select('text created photos repliedBy');
        return res.status(200).json({ replies });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const deleteReplyInComment = async (req, res) => {
    const user = req.user;
    const replyId = req.params.id;
    try {
        await CommentReply.deleteOne({ _id: replyId, commentedBy: user._id });
        return res.status(200).json({ msgs: "Reply deleted successfully" });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const updateReplyInComment = async (req, res) => {
    const user = req.user;
    const replyId = req.params.id;
    const { text } = req.body;
    const image = req.file;
    try {
        const commentReply = await CommentReply.findById(replyId);
        if (!commentReply) {
            return res.status(400).json({ msgs: "Reply not found" });
        }
        if (commentReply.repliedBy.toString() !== user._id.toString()) {
            return res.status(400).json({ msgs: "You are not authorized to update this reply" });
        }
        if (image) {
            if (commentReply.photos) {
                fs.unlink(path.join(__dirname, `../../../uploads/comment/${commentReply.photos}`), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            commentReply.photos = image.filename;
        }
        commentReply.text = text;
        await commentReply.save();
        return res.status(200).json({ msgs: "Reply updated successfully" });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

module.exports = {
    createCommentInPost,
    getCommentInPost,
    deleteCommentInPost,
    updateCommentInPost,
    createReplyInComment,
    getReplyInComment,
    deleteReplyInComment,
    updateReplyInComment
}