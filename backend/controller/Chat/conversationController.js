const conversationSchema = require('../../models/Chat/conversation');
const messageSchema = require('../../models/Chat/message');

const numberConversationPerPage = 15;
const numberMessagePerPage = 20;

const getConversationById = async (req, res) => {
    const userId = req.user._id;
    try {
        let conversation = await conversationSchema
            .findOne({ _id: req.params.id })
            .populate(
                {
                    path: 'participants', select: 'userInformation',
                    populate: {
                        path: 'userInformation',
                        select: 'firstName lastName fullName avatar -_id'
                    }
                }
            )
            .select('participants')
            ;

        if (conversation) {
            conversation = {
                _id: conversation._id,
                participants: conversation.participants.filter(
                    (participant) => participant._id.toString() !== userId
                )
            }
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
        const user = req.user;
        const conversations = await conversationSchema.find({ participants: user._id })
            .populate({
                path: 'participants', select: 'isOnline userInformation', populate: {
                    path: 'userInformation',
                    select: 'firstName lastName avatar -_id'
                }
            })
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
            //.populate({ path: 'sender', select: 'avatar isOnline userInformation' })
            .sort({ create_at: -1 })
            .skip((page - 1) * numberMessagePerPage)
            .limit(numberMessagePerPage)
            ;
        if (messages) {
            return res.json(messages.sort((a, b) => a.create_at - b.create_at));
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