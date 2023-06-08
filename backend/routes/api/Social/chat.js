const conversationController = require('../../../controller/Chat/conversationController');
const messageController = require('../../../controller/Chat/messageController');

const router = require('express').Router();


router.get('/conversation/:id', conversationController.getConversationById);

router.get('/conversation/user/:page', conversationController.getConversationsByUser);

router.get('/conversation/:id/messages/:page', conversationController.getAllMessageInConversation);

router.route('/message')
    .post(messageController.sendMessage);

router.route('/message/:id')
    .delete(messageController.deleteMessage);

module.exports = router;