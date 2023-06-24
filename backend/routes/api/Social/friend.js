const friendController = require('../../../controller/Social/friendController');

const router = require('express').Router();

router.get('/get-friends', friendController.getFriends);

router.get('/get-number-of-friends', friendController.getNumberOfFriends);

router.post('/send-friend-request', friendController.sendRequestFriend);

router.get('/get-add-friend-requests', friendController.getAddFriendRequests);

router.post('/accept-send-friend-request', friendController.acceptAddFriendRequest);

router.post('/reject-send-friend-request', friendController.rejectAddFriendRequest);

router.delete('/delete-friend', friendController.removeFriend);

router.post('/cancel-my-request-friend', friendController.cancelMyRequestFriend);

module.exports = router;