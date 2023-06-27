// require('dotenv-flow').config();
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const userSchema = require('../../models/user');
const grpc = require('../../utils/proto/grpcServices');

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET
        , { expiresIn: '1d' }
    );
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET
        , { expiresIn: '7d' }
    );
}

const confirmLogin = async (req, res, next) => {
    const user = await userSchema.findOne({ username: req.body.username });
    if (!user) {
        return res.status(404).send(`Can't find user with username "${req.body.username}" `);
    }
    try {
        const checkPassword = await bcypt.compare(req.body.password, user.password);
        if (checkPassword) {
            const accessToken = generateAccessToken({ username: user.username, role: user.role });
            const refreshToken = generateRefreshToken({ username: user.username, role: user.role });
            // await userSchema.findOneAndUpdate({ username: user.username }, { token: refreshToken });
            res.json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
        else {
            throw createError.Conflict('Password is incorrect');
        }
    }
    catch (err) {
        if (err.isJoi === true) {
            err.status = 422;
        }
        next(err);
    }
}

const confirmLoginWithFaceId = async (req, res, next) => {
    let result = await grpc.IdentificationService.identify(req.files[0].destination);

    const user = await userSchema.findOne({ faceId: result.userId });

    if (!user) {
        return res.status(404).send(`Not Exist Your Face Id`);
    }
    try {
        const accessToken = generateAccessToken({ username: user.username, role: user.role });
        const refreshToken = generateRefreshToken({ username: user.username, role: user.role });
        // await userSchema.findOneAndUpdate({ username: user.username }, { token: refreshToken });
        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    catch (err) {
        if (err.isJoi === true) {
            err.status = 422;
        }
        next(err);
    }
}

const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).send("Access denied when try to refresh token");
    }
    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (user?.username) {
            const checkUser = await userSchema.findOne({ username: user.username })
            if (!checkUser) {
                createError.Conflict('User is not exist');
            }
            else {
                if (checkUser.token !== refreshToken) {
                    createError.Conflict('Invalid token');
                }
            }
        }
        const accessToken = generateAccessToken({ username: user.username, role: user.role });
        res.json({ accessToken: accessToken });
    }
    catch (err) {
        res.status(403).send(err);
    }
}

const logout = async (req, res) => {
    const token = req.user.token;
    if (!token) {
        return res.status(401).send("Access denied when try to log out");
    }
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        await userSchema.findOneAndUpdate({ username: user.username }, { token: null });
        res.send("Logout successfully");
    }
    catch (err) {
        res.status(403).send("Invalid token when try to log out");
    }
}

module.exports = {
    confirmLogin,
    refreshToken,
    logout,
    confirmLoginWithFaceId
}