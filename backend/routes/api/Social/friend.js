const friendController = require('../../../controller/Social/friendController');

const router = require('express').Router();

router.get('/get-friends', friendController.getFriends);

router.get('/get-number-of-friends', friendController.getNumberOfFriends);

router.post('/add-friend-request', friendController.sendRequestFriend);

router.get('/get-add-friend-requests', friendController.getAddFriendRequests);

router.post('/accept-add-friend-request', friendController.acceptAddFriendRequest);

router.delete('/reject-add-friend-request', friendController.rejectAddFriendRequest);

router.delete('/delete-friend', friendController.removeFriend);

module.exports = router;