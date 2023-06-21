require('dotenv').config();
const bcypt = require('bcrypt');
const userInformationSchema = require('../../models/Account/userInformation');
const userSchema = require('../../models/Account/user');
const tokenSchema = require('../../models/Account/token');

const friendSchema = require('../../models/Social/friend');

const getAllUsers = async (req, res) => {
    try {
        if (req.query.username) {
            const user = await userSchema.findOne({ username: req.query.username }).populate('userInformation');
            if (user) {
                return res.json(user);
            }
            res.status(404).send("User not found");
        }
        const users = await userSchema.find();
        if (users.length === 0) {
            res.status(404).send("User not found");
        }
        return res.json(users);
    }
    catch (err) {
        return res.status(500).send();
    }
}

const createUser = async (req, res) => {
    try {
        const username = req.body.username;
        if (username === null) {
            return res.status(400).send("Username is required");
        }
        const userExist = await userSchema.findOne({ username: username });
        if (userExist) {
            return res.status(400).send("Username is already exist");
        }
        const hashedPassword = await bcypt.hash(req.body.password, 10);

        const userInformation = new userInformationSchema({ firstName: 'New', lastName: 'User' });
        await userInformation.save();

        const user = {
            username: username,
            password: hashedPassword,
            role: req.body.role || 'user',
            userInformation: userInformation._id,
            create_at: Date.now(),
            isOnline: false
        }
        const newUser = new userSchema(user);
        await newUser.save();

        const friend = new friendSchema({
            user: newUser._id,
            friends: []
        })
        await friend.save();

        return res.status(201).json(newUser);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send("Oops! Something went wrong");
    }
}

const updateUserPassword = async (req, res) => {
    try {
        const hashedPassword = await bcypt.hash(req.body.password, 10);
        const user = {
            username: req.body.username,
            password: hashedPassword
        }
        await userSchema.findOneAndUpdate(
            { username: user.username },
            { password: user.password }
        )
        return res.status(200).send("Update password successfully");
    }
    catch (err) {
        return res.status(500).send();
    }
}

const changePassword = async (req, res) => {
    try {
        const hashedPassword = await bcypt.hash(req.body.password, 10);
        await userSchema.findOneAndUpdate(
            { username: req.user.username },
            { password: hashedPassword, token: null }
        )
        return res.status(200).send("Update password successfully");
    }
    catch (err) {
        return res.status(500).send();
    }
}

const deleteUser = async (req, res) => {
    try {
        const username = req.body.username;
        const user = await userSchema.findOne({ username: username });
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        else {
            await userInformationSchema.deleteOne({ _id: user.userInformation });
            await tokenSchema.deleteOne({ _id: user.userInformation });
            await userSchema.deleteOne({ _id: user.userInformation });
            return res.status(200).send(`Delete user successfully: ${username}`);
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const getUserById = (req, res) => {
    try {
        const user = userSchema.findById(req.params.id);
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).send("Can't find user with ID: " + req.params.id);
    }
}

const getUserByUsername = (req, res) => {
    try {
        const user = userSchema.findOne({ username: req.params.username });
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).send("Can't find user with username: " + req.params.username);
    }
}


module.exports = {
    getAllUsers,
    createUser,
    updateUserPassword,
    deleteUser,
    getUserById,
    getUserByUsername,
    changePassword
}