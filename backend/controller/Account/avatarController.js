const userSchema = require('../../models/user');
const fs = require('fs');
const path = require('path');
const getImages = async (req, res) => {
    const username = req.user.username;
    const user = await userSchema.findOne({ username: username });
    if (!user) {
        return res.status(400).send({ error: "User not found" });
    }
    if (!user.avatar) {
        return res.status(400).send({ error: "Avatar not found" });
    }
    res.sendFile('uploads/avatar/' + user.avatar, { root: __dirname + '../../../' })
}

const uploadAndSaveAvatar = async (req, res) => {
    if (!req.file) {
        return res.json({ msgs: "Please select a file to upload" });
    }
    const username = req.user.username;
    const oldAvatar = await userSchema.findOne({ username: username });
    if (oldAvatar.avatar) {
        fs.unlink(path.join(__filename, '..', '..', '..', 'uploads/avatar', oldAvatar.avatar), (err) => {
            if (err) {
                return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
            }
        })
    }
    const avatar = req.file.filename;
    await userSchema.findOneAndUpdate({ username: username }, { avatar: avatar });
    res.json({ msgs: "Avatar uploaded successfully" });
}

module.exports = { getImages, uploadAndSaveAvatar };