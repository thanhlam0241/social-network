// require('dotenv-flow').config();
const bcypt = require('bcrypt');
const userSchema = require('../../models/user');

const getAllUsers = async (req, res) => {
    try {
        if (req.query.username) {
            const user = await userSchema.findOne({ username: req.query.username });
            if (user) {
                res.json(user);
                return;
            }
            res.status(404).send("User not found");
        }
        const users = await userSchema.find();
        if (users.length === 0) {
            res.status(404).send("User not found");
        }
        res.json(users);
    }
    catch (err) {
        res.status(500).send();
    }
    res.json(users);
}

const createUser = async (req, res) => {
    try {
        const username = req.body.username;
        if (username === null) {
            res.status(400).send("Username is required");
            return;
        }
        const userExist = await userSchema.findOne({ username: username });
        if (userExist) {
            res.status(400).send("Username is already exist");
            return;
        }
        const hashedPassword = await bcypt.hash(req.body.password, 10);
        const user = {
            username: username,
            password: hashedPassword,
            role: req.body.role || 'user'
        }

        const newUser = new userSchema(user);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.send(req.body);
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
        res.status(200).send("Update password successfully");
    }
    catch (err) {
        res.status(500).send();
    }
}

const changePassword = async (req, res) => {
    try {
        const hashedPassword = await bcypt.hash(req.body.password, 10);
        await userSchema.findOneAndUpdate(
            { username: req.user.username },
            { password: hashedPassword, token: null }
        )
        res.status(200).send("Update password successfully");
    }
    catch (err) {
        res.status(500).send();
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
            await userSchema.deleteOne({ username: username });
            res.status(200).send(`Delete user successfully: ${username}`);
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send();
    }
}

const getUserById = (req, res) => {
    try {
        const user = userSchema.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).send("Can't find user with ID: " + req.params.id);
    }
}

const getUserByUsername = (req, res) => {
    try {
        const user = userSchema.findOne({ username: req.params.username });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).send("Can't find user with username: " + req.params.username);
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