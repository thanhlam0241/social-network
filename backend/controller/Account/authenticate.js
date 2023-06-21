require('dotenv').config();
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const userSchema = require('../../models/Account/user');
const tokenSchema = require('../../models/Account/token');

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
            const accessToken = generateAccessToken({ _id: user._id, username: user.username, role: user.role });
            const refreshToken = generateRefreshToken({ username: user.username, role: user.role });
            const token = new tokenSchema({ username: user.username, token: refreshToken });
            const isSaveToken = await token.save();
            console.log(isSaveToken)
            if (isSaveToken) {
                return res.json({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            }
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

const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).send("Access denied when try to refresh token");
    }
    try {
        const checkToken = await tokenSchema.findOne({ token: refreshToken });
        if (!checkToken) {
            throw createError.Conflict('Token is not exist');
        }
        const user = await userSchema.findOne({ username: checkToken.username });
        const accessToken = generateAccessToken({ _id: user._id, username: user.username, role: user.role });
        return res.status(200).json({ accessToken: accessToken });
    }
    catch (err) {
        return res.status(403).send(err);
    }
}

const logout = async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.status(401).send("Access denied when try to log out");
    }
    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (user?.username) {
            const checkUser = await userSchema.findOne({ username: user.username })
            if (!checkUser) {
                createError.Conflict('User is not exist');
            }
        }
        await tokenSchema.findOneAndDelete({ token: refreshToken });
        return res.send("Logout successfully");
    }
    catch (err) {
        return res.status(403).send("Invalid token when try to log out");
    }
}

module.exports = {
    confirmLogin,
    refreshToken,
    logout
}