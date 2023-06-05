const messageSchema = require('../../models/Chat/message');
const conversationSchema = require('../../models/Chat/conversation');

const sendMessage = async (req, res) => {
    const user = req.user;
    try {
        const conver_id = req.body.conversation;
        const conversation = await conversationSchema.findById(conver_id);
        if (!conversation) {
            return res.status(400).send("Conversation not found");
        }
        const message = new messageSchema({
            conversation: conver_id,
            sender: user._id,
            text: req.body.text
        });
        const savedMessage = await message.save();
        if (savedMessage) {
            conversation.last_message = savedMessage._id;
            await conversation.save();
            return res.json(savedMessage);
        }
        else {
            return res.status(400).send("Can't send message");
        }
    }
    catch (err) {
        return res.status(500).send("Error. Try after few minutes or check again your input");
    }
}

const deleteMessage = async (req, res) => {
    try {
        const message = await messageSchema.findById(req.params.id);
        if (message) {
            if (message.sender != req.user._id) {
                return res.status(400).send("Can't delete message because you are not sender ");
            }
            if (message.isDeleted) {
                return res.status(400).send("Message is already deleted");
            }
            message.isDeleted = true;
            const savedMessage = await message.save();
            if (savedMessage) {
                return res.json('Delete message successfully');
            }
        }
    }
    catch (err) {
        return res.status(500).send("Error from server. Try after few minutes");
    }
}

module.exports = {
    sendMessage,
    deleteMessage
}
