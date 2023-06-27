// require('dotenv-flow').config();
const bcypt = require('bcrypt');
const userSchema = require('../../models/user');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const grpc = require('../../utils/proto/grpcServices');

const setReqId = (req, res, next) => {
    req.id = crypto.randomUUID();
    next();
}

const uploadFacesToFolderMulter = multer({
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            // cb(null, crypto.randomUUID() + '.jfif')
            cb(null, file.originalname)
        },
        destination: function (req, file, cb) {
            let dir = path.join(__filename, '..', '..', '..', 'uploads/faces', req.id);
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, () => {
                    cb(null, dir);
                });
            }
            else
                cb(null, dir);
        }
    }),

    // limits: {
    //     fileSize: 20000000
    // },
}).array('faces', 30)

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
            res.status(400).json({ msgs: "Username is required", stepError: "userPass" });
            return;
        }
        const userExist = await userSchema.findOne({ username: username });
        if (userExist) {
            res.status(400).json({ msgs: "Username is already exist", stepError: "userPass" });
            return;
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msgs: "Images/jpeg required.", stepError: "face" });
        }
        const user = {
            username: username,
            role: req.body.role || 'user'
        }
        let result = await grpc.IdentificationService.identify(req.files[0].destination);
        // console.log(result);
        if (result.userId) {
            const faceExist = await userSchema.findOne({ faceId: result.userId});
            if (faceExist){
                return res.status(400).json({msgs: "Face is already exist", stepError: "face"});
            }
            user.faceId = result.userId;
            
        }
        else{
            let result = await grpc.RegisterService.register(user.username, req.files[0].destination);
            // console.log(result);
            if (result.success) {
                user.faceId = user.username;
            }
            else{
                return res.status(400).json({msgs: "Face can't be resgistered. Images maybe low quality or doesn't contain face or your face isn't in the center.", stepError: "face"});
            }
        }

        const hashedPassword = await bcypt.hash(req.body.password, 10);
        user.password = hashedPassword;

        const newUser = new userSchema(user);
        await newUser.save();
        res.status(201).json({
            username: newUser.username,
            role: newUser.role
        });
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
    changePassword,
    setReqId,
    multerFaces: uploadFacesToFolderMulter
}