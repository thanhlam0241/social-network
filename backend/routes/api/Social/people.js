const PeopleController = require('../../../controller/Social/people');

const router = require('express').Router();

router.get('/recommend-people/:page', PeopleController.getRecommendPeople);
router.get('/all-friend-request', PeopleController.getAllMyRequestFriends);
router.get('/friend-request/:page', PeopleController.getRequestFriendToYou);
router.get('/your-request-friend/:page', PeopleController.getYourRequestFriend);
router.get('/your-friend/:page', PeopleController.getYourFriend);

module.exports = router;