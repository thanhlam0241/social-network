const addFriendSchema = require('../../models/Social/addFriend');
const friendSchema = require('../../models/Social/friend');

const conversationSchema = require('../../models/Chat/conversation');
const participantSchema = require('../../models/Chat/participant');


const getFriends = async (req, res) => {
    const user = req.user;
    try {
        const friends = await friendSchema.findOne({ user: user._id }).populate('friends').select('friends')?.friends;
        return res.status(200).json({ friends });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getNumberOfFriends = async (req, res) => {
    const user = req.user;
    try {
        const numberOfFriends = await friendSchema.findOne({ user: user._id }).select('friends').countDocuments();
        return res.status(200).json({ numberOfFriends });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
}

const sendRequestFriend = async (req, res) => {
    const user = req.user;
    console.log(user._id)
    const addFriend = new addFriendSchema({
        sender: user._id,
        receiver: req.body.receiver,
        text: req.body.text
    });
    try {
        const isExist = await addFriendSchema.findOne({ sender: user._id, receiver: req.body.receiver });
        if (isExist) return res.status(400).json({ message: 'You have already sent a friend request to this user' });
        await addFriend.save();
        const newConversation = new conversationSchema();
        await newConversation.save();
        const newParticipant = new participantSchema({
            conversation: newConversation._id,
            user: user._id
        });
        await newParticipant.save();
        const newParticipant2 = new participantSchema({
            conversation: newConversation._id,
            user: req.body.receiver
        });
        await newParticipant2.save();
        return res.status(200).json({ message: 'Send request friend successfully' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getAddFriendRequests = async (req, res) => {
    const user = req.user;
    try {
        const addFriendRequests = await addFriendSchema.find({ receiver: user._id }).populate('sender').select('sender text');
        if (!addFriendRequests || addFriendRequests?.length === 0) return res.status(404).json({ message: 'Add friend requests not found' })
        return res.status(200).json(addFriendRequests);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const acceptAddFriendRequest = async (req, res) => {
    const user = req.user;
    const sender = req.body.sender;
    try {
        const requestFriend = await addFriendSchema.findOne({ sender: sender, receiver: user._id });
        if (!requestFriend) {
            return res.status(404).json({ message: 'Request friend not found' });
        }
        await friendSchema.updateOne({ user: user._id }, { $push: { friends: sender } });
        await friendSchema.updateOne({ user: sender }, { $push: { friends: user._id } });
        await addFriendSchema.deleteOne({ sender: sender, receiver: user._id });
        return res.status(200).json({ message: 'Accept add friend request successfully' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const rejectAddFriendRequest = async (req, res) => {
    const user = req.user;
    const sender = req.body.sender;
    try {
        await addFriendSchema.deleteOne({ sender: sender, receiver: user._id });
        return res.status(200).json({ message: 'Reject add friend request successfully' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const removeFriend = async (req, res) => {
    const user = req.user;
    const friend = req.body.friend;
    try {
        await friendSchema.updateOne({ user: user._id }, { $pull: { friends: friend } });
        await friendSchema.updateOne({ user: friend }, { $pull: { friends: user._id } });
        return res.status(200).json({ message: 'Remove friend successfully' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const cancelMyRequestFriend = async (req, res) => {
    const user = req.user;
    const receiver = req.body.receiver;
    try {
        await addFriendSchema.deleteOne({ sender: user._id, receiver: receiver });
        return res.status(200).json({ message: 'Cancel my request friend successfully' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getFriends,
    getNumberOfFriends,
    sendRequestFriend,
    getAddFriendRequests,
    acceptAddFriendRequest,
    rejectAddFriendRequest,
    removeFriend,
    cancelMyRequestFriend
}