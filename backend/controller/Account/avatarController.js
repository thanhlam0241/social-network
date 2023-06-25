const userSchema = require('../../models/Account/user');
const userInformationSchema = require('../../models/Account/userInformation');
const fs = require('fs');
const path = require('path');

const getMyAvatarImage = async (req, res) => {
    const userId = req.user._id;
    const user = await userSchema.findById(userId).populate('userInformation');
    if (!user) {
        return res.status(400).send({ error: "User not found" });
    }
    else if (!user?.userInformation?.avatar) {
        return res.status(400).send({ error: "Avatar not found" });
    }
    else {
        const urlAvatar = 'avatar/' + user.userInformation.avatar;
        //res.json('uploads/avatar/' + user.userInformation.avatar, { root: __dirname + '../../../' })
        res.json(
            {
                url: urlAvatar,
                status: 200
            }
        )
    }
}

const getAvatarImage = async (req, res) => {
    const userId = req.params.id;
    const user = await userSchema.findById(userId).populate('userInformation');
    if (!user) {
        return res.status(400).send({ error: "User not found" });
    }
    else if (!user?.userInformation?.avatar) {
        return res.status(400).send({ error: "Avatar not found" });
    }
    else {
        //res.sendFile('uploads/avatar/' + user.userInformation.avatar, { root: __dirname + '../../../' })
        const urlAvatar = 'avatar/' + user.userInformation.avatar;
        //res.json('uploads/avatar/' + user.userInformation.avatar, { root: __dirname + '../../../' })
        res.json(
            {
                url: urlAvatar,
                status: 200
            }
        )
    }
}

const uploadAndSaveAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ msgs: "Please select a file to upload" });
        }
        const userId = req.user._id;
        const user = await userSchema.findById(userId);
        const userInfo = await userInformationSchema.findById(user.userInformation);

        if (userInfo?.avatar) {
            fs.unlink(path.join(__filename, '..', '..', '..', 'uploads/avatar', userInfo.avatar), (err) => {
                if (err) {
                    return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
                }
            })
        }
        const avatar = req.file.filename;
        userInfo.avatar = 'resized-' + avatar;
        fs.unlinkSync(req.file.path)
        await userInfo.save();
        return res.json({ msgs: "Avatar uploaded successfully" });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

module.exports = { getAvatarImage, uploadAndSaveAvatar, getMyAvatarImage };