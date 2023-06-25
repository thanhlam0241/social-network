const UserSchema = require('../../models/Account/user');
const FriendSchema = require('../../models/Social/friend');
const FriendRequestSchema = require('../../models/Social/addFriend');
//const UserInformationSchema = require('../../models/Account/userInformation');

const requestValidation = require('../../utils/validation/request');

// Path: backend\controller\Social\people.js

const numberOfRecommendPeoplePerPage = 20;
const numberOfRequestFriendToYouPerPage = 20;
const numberOfYourRequestFriendPerPage = 20;
const numberOfYourFriendPerPage = 20;

const getAllMyRequestFriends = async (req, res) => {
    const user = req.user;
    try {
        const listRequestFriends = await FriendRequestSchema.find({ sender: user._id });
        return res.status(200).json({
            success: true, data: listRequestFriends.map((request) => {
                return request.receiver;
            })
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getRecommendPeople = async (req, res) => {
    const { page } = req.params;
    if (!page || !requestValidation.checkNumber(page)) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const skip = (parseInt(page) - 1) * numberOfRecommendPeoplePerPage;
    const userId = req.user._id;
    console.log(userId)
    try {
        const listFriends = (await FriendSchema.findOne({ user: userId }));

        const listRecommendPeople = await UserSchema.find({ _id: { $nin: [...listFriends.friends, userId] } })
            .populate('userInformation', '-__v -_id -email -phone -address')
            .select('isOnline userInformation ')
            .skip(skip)
            .limit(numberOfRecommendPeoplePerPage);

        if (listRecommendPeople?.length === 0) {
            return res.status(404).json({ success: false, message: 'There is no people! The page is exceed the max page' });
        }

        return res.status(200).json({ success: true, data: listRecommendPeople });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getRequestFriendToYou = async (req, res) => {
    const { page } = req.params;
    if (!page || !requestValidation.checkNumber(page)) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const skip = (parseInt(page) - 1) * numberOfRequestFriendToYouPerPage;
    const user = req.user;
    try {
        const listRequestFriendToYou = await FriendRequestSchema
            .find({ receiver: user._id })
            .populate({
                path: 'sender',
                select: 'isOnline userInformation',
                populate: {
                    path: 'userInformation',
                    select: '-__v -_id -email -phone -address'
                }
            })
            .select('-_id -receiver -__v')
            .skip(skip)
            .limit(numberOfRequestFriendToYouPerPage);

        if (listRequestFriendToYou?.length === 0) {
            return res.status(200).json({ success: false, message: 'There is no request friend to you! The page is exceed the max page' });
        }
        return res.status(200).json({ success: true, data: listRequestFriendToYou });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getYourRequestFriend = async (req, res) => {
    const { page } = req.params;
    if (!page || !requestValidation.checkNumber(page)) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const skip = (parseInt(page) - 1) * numberOfYourRequestFriendPerPage;
    const user = req.user;
    try {
        const listYourRequestFriend = await FriendRequestSchema
            .find({ sender: user._id })
            .populate({
                path: 'receiver',
                select: 'isOnline userInformation',
                populate: {
                    path: 'userInformation',
                    select: '-__v -_id -email -phone -address'
                }
            })
            .select('-_id -sender -__v')
            .skip(skip)
            .limit(numberOfYourRequestFriendPerPage);
        if (listYourRequestFriend?.length && listYourRequestFriend?.length === 0) {
            return res.status(200).json({ success: false, message: 'There is no your request friend! The page is exceed the max page' });
        }
        return res.status(200).json({ success: true, data: listYourRequestFriend });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getYourFriend = async (req, res) => {
    const { page } = req.params;
    if (!page || !requestValidation.checkNumber(page)) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const skip = (parseInt(page) - 1) * numberOfYourFriendPerPage;
    const user = req.user;
    try {
        const listYourFriend = await FriendSchema
            .findOne({ user: user._id })
            .populate({
                path: 'friends',
                select: 'isOnline userInformation',
                populate: {
                    path: 'userInformation',
                    select: '-__v -_id -email -phone -address'
                }
            })
            .select('-_id -user -__v')
            .skip(skip)
            .limit(numberOfYourFriendPerPage);
        if (listYourFriend?.friends?.length && listYourFriend?.friends?.length !== 0) {
            return res.status(200).json({ success: true, data: listYourFriend?.friends });
        }

        return res.status(200).json({ success: false, message: 'There is no your friend! The page is exceed the max page ' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getRecommendPeople,
    getRequestFriendToYou,
    getYourRequestFriend,
    getYourFriend,
    getAllMyRequestFriends
}