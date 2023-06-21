const PostSchema = require('../../models/Social/postSchema.js');
const emotionPostSchema = require('../../models/Social/emotionPost.js');
const commentPostSchema = require('../../models/Social/commentPost.js');
const fs = require('fs');
const path = require('path');

// Path: backend\controller\Social\postController.js

const tagSchema = require('../../models/const/tag.js');

const numberOfPostPerPageInProfile = 5;

const numberOfPostPerPageInHome = 10;

const numberOfCommentPerPage = 10;

const createPost = async (req, res) => {
    const user = req.user;
    const { title, body, tags } = req.body;
    const image = req.file;
    try {
        const data = {
            title,
            body,
            postedBy: user._id,
            created: Date.now()
        }
        if (image) {
            data.photo = image.filename;
        }
        if (tags && tags?.length) {
            for (let i = 0; i < tags.length; i++) {
                const tag = await tagSchema.findOne({ name: tags[i] });
                if (!tag) {
                    const newTag = await tagSchema.create({ name: tags[i] });
                    data.tags.push(newTag._id);
                }
                else {
                    data.tags.push(tag._id);
                }
            }
        }
        const post = await PostSchema.create(data);
        return res.status(200).json({ post });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const getPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await PostSchema.findById(postId).populate('postedBy', '_id name')
            .select(' -comments -emotions');
        if (!post) {
            return res.status(400).json({ msgs: "Post not found" });
        }
        return res.status(200).json({ post });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const getAllPosts = async (req, res) => {
    const page = req.params.page;
    try {
        const posts = await PostSchema.find().populate('postedBy', '_id name')
            .select(' -comments -emotions')
            .sort({ created: -1 }).skip((page - 1) * numberOfPostPerPageInHome)
            .limit(numberOfPostPerPageInHome)
            .exec((err, posts) => {
                if (err) {
                    return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
                }
            });
        return res.status(200).json({ posts });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const getMyPosts = async (req, res) => {
    const user = req.user;
    const page = req.params.page;
    try {
        const posts = await PostSchema.find({ postedBy: user._id })
            .populate('postedBy', '_id name')
            .select(' -comments -emotions')
            .sort({ created: -1 }).skip((page - 1) * numberOfPostPerPageInProfile)
            .limit(numberOfPostPerPageInProfile)
            .exec((err, posts) => {
                if (err) {
                    return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
                }
            });
        return res.status(200).json({ posts });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const deletePost = async (req, res) => {
    const postId = req.params.id;
    const user = req.user;
    try {
        const post = await PostSchema.findById(postId);
        if (!post) {
            return res.status(400).json({ msgs: "Post not found" });
        }
        if (post.postedBy._id.toString() !== user._id.toString()) {
            return res.status(400).json({ msgs: "You are not authorized to delete this post" });
        }
        const postDeleted = await post.remove();
        if (postDeleted.photo) {
            fs.unlink(path.join(__dirname, `../../../uploads/post/${postDeleted.photo}`), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        return res.status(200).json({ msgs: "Post deleted successfully" });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const user = req.user;
    const { title, body } = req.body;
    const image = req.file;
    try {
        const postUpdated = PostSchema.findById(postId);
        if (!postUpdated) {
            return res.status(400).json({ msgs: "Post not found" });
        }
        if (postUpdated.postedBy._id.toString() !== user._id.toString()) {
            return res.status(400).json({ msgs: "You are not authorized to update this post" });
        }
        if (image) {
            if (postUpdated.photo) {
                fs.unlink(path.join(__dirname, `../../../uploads/post/${postDeleted.photo}`), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            postUpdated.photo = image.filename;
        }
        postUpdated.title = title;
        postUpdated.body = body;
        postUpdated.updated = Date.now();
        const post = await postUpdated.save();
        return res.status(200).json({ post });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server when trying to update post. Please wait and try again" });
    }
}

const makeEmotion = async (req, res) => {
    const postId = req.params.id;
    const user = req.user;
    const { emoji } = req.body;
    try {
        const post = await PostSchema.findById(postId);
        if (!post) {
            return res.status(400).json({ msgs: "Post not found" });
        }
        const emotionExist = post.emotions.find(emotion => emotion.user.toString() === user._id.toString());
        post.emotions = post.emotions.filter(emotion => emotion.user.toString() !== user._id.toString());
        if (emotionExist && emotionExist.emoji !== emoji) {
            post.emotions.push({ emoji, user: user._id });
        }
        const postUpdated = await post.save();
        if (postUpdated) {
            return res.status(200).json({
                success: true,
                msg: "Emotion updated successfully",
            });
        }
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server when trying to update post. Please wait and try again" });
    }
}

const getAllPostsWithHashtag = async (req, res) => {
    const page = req.params.page;
    const hashtag = req.params.hashtag;
    try {
        const posts = await PostSchema.find({ hashtags: hashtag })
            .populate('postedBy', '_id name')
            .select(' -comments -emotions')
            .sort({ created: -1 }).skip((page - 1) * numberOfPostPerPageInHome)
            .limit(numberOfPostPerPageInHome)
            .exec((err, posts) => {
                if (err) {
                    return res.status(404).json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
                }
            });
        return res.status(200).json({ posts });
    }
    catch (err) {
        return res.status(500).json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const getPostsOfUser = async (req, res) => {
    const page = req.params.page;
    const userId = req.params.id;
    try {
        const posts = await PostSchema.find({ postedBy: userId })
            .populate('postedBy', '_id name')
            .select(' -comments -emotions')
            .sort({ created: -1 }).skip((page - 1) * numberOfPostPerPageInProfile)
            .limit(numberOfPostPerPageInProfile)
            .exec((err, posts) => {
                if (err) {
                    return res.status(404).json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
                }
            });
        return res.status(200).json({ posts });
    }
    catch (err) {
        return res.status(500).json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

const getNumberOfEmotions = async (req, res) => {
    const postId = req.params.id;
    try {
        const numberOfEmotions = await emotionPostSchema.countDocuments({ inPost: postId });
        return res.status(200).json({ numberOfEmotions });
    }
    catch (err) {
        return res.status(500).json({ msgs: "Opps! Something went wrong with our server when getting number of emotions in post. Please wait and try again" });
    }
}

const getNumberOfComments = async (req, res) => {
    const postId = req.params.id;
    try {
        const numberOfComments = await commentPostSchema.countDocuments({ inPost: postId });
        return res.status(200).json({ numberOfComments });
    }
    catch (err) {
        return res.status(500).json({ msgs: "Opps! Something went wrong with our server when getting number of comments in post. Please wait and try again" });
    }
}

module.export = {
    createPost,
    getPost,
    getAllPosts,
    getMyPosts,
    deletePost,
    updatePost,
    makeEmotion,
    getAllPostsWithHashtag,
    getPostsOfUser,
    getNumberOfEmotions,
    getNumberOfComments
}
