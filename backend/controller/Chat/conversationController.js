const conversationSchema = require('../../models/Chat/conversation');
const participantSchema = require('../../models/Chat/participant');
const messageSchema = require('../../models/Chat/message');

const numberConversationPerPage = 15;
const numberMessagePerPage = 10;

const getConversationById = async (req, res) => {
    try {
        const conversation = await conversationSchema.findById(req.params.id);
        if (conversation) {
            return res.json(conversation);
        }
        return res.status(404).send("Conversation not found");
    }
    catch (err) {
        return res.status(500).send('Error when get conversation by id');
    }
}

const getConversationsByUser = async (req, res) => {
    try {
        const page = req.params.page;
        const conversations = await participantSchema.find({ user: req.user._id })
            .populate({
                path: 'conversation', select: 'isGroup last_message',
                sort: [['last_message.create_at', -1]]
            })
            .select('conversation')
            .skip((page - 1) * numberConversationPerPage)
            .limit(numberConversationPerPage);
        if (conversations) {
            return res.json(conversations);
        }
        return res.status(404).send("Conversation not found");
    }
    catch (err) {
        return res.status(500).send('Error when get conversation by id user');
    }
}

const getAllMessageInConversation = async (req, res) => {
    try {
        const page = req.params.page;
        const messages = await messageSchema.find({ conversation: req.params.id })
            .populate({ path: 'sender', select: 'username avatar isOnline userInformation' })
            .sort({ create_at: -1 })
            .skip((page - 1) * numberMessagePerPage)
            .limit(numberMessagePerPage)
            ;
        if (messages) {
            return res.json(messages);
        }
        return res.status(404).send("Message not found");
    }
    catch (err) {
        return res.status(500).send('Error when get messages by id conversation');
    }
}



module.exports = {
    getConversationById,
    getConversationsByUser,
    getAllMessageInConversation
}