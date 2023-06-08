const userInformationSchema = require('../../models/Account/userInformation');
const userSchema = require('../../models/Account/user');

const getUserInformationById = async (req, res) => {
    try {
        const user = await userSchema.findById(req.user._id);
        const userInformation = await userInformationSchema.findOne({ _id: user.userInformation });
        if (userInformation) {
            return res.json(userInformation);
        }
        res.status(404).send("User not found");
    }
    catch (err) {

    }
}

const updateUserInformation = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        await userInformationSchema.findByIdAndUpdate(user.userInformation, { ...req.body });
        return res.status(201).json({ message: "Update successfully" });
    }
    catch (err) {
        return res.status(500).send("Server error: ", err);
    }
}

const createUserInformation = async (req, res) => {
    try {
        const userInformation = await userInformationSchema.create({ ...req.body });
        return res.json(userInformation);
    }
    catch (err) {

    }
}

module.exports = {
    getUserInformationById,
    updateUserInformation,
    createUserInformation
}
