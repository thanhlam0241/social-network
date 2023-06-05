const userSchema = require('../../models/Account/user');
const userInformationSchema = require('../../models/Account/userInformation');
const fs = require('fs');
const path = require('path');

const getBackgroundImage = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userSchema.findById(userId).populate('userInformation');
        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }
        else if (!user?.userInformation?.background) {
            return res.status(400).send({ error: "Background not found" });
        }
        else {
            res.sendFile('uploads/background/' + user.userInformation.background, { root: __dirname + '../../../' })
        }
    }
    catch (err) {
        return res.json(err);
    }

}

const uploadAndSaveBackground = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ msgs: "Please select a file to upload" });
        }
        const userId = req.user._id;
        const user = await userSchema.findById(userId);
        const userInfo = await userInformationSchema.findById(user.userInformation);
        if (userInfo.background) {
            fs.unlink(path.join(__filename, '..', '..', '..', 'uploads/background', userInfo.background), (err) => {
                if (err) {
                    return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
                }
            })
        }
        const background = req.file.filename;
        userInfo.background = background;
        await userInfo.save();
        return res.json({ msgs: "Background uploaded successfully" });
    }
    catch (err) {
        return res.json({ msgs: "Opps! Something went wrong with our server. Please wait and try again" });
    }
}

module.exports = { getBackgroundImage, uploadAndSaveBackground };