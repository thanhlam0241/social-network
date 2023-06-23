require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateTokenSocket = (socket, next) => {
    const token = socket.handshake.auth.token;
    //console.log(token)
    if (token == null) {
        return next(new Error("Token is required"));
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return next(new Error("Token is invalid"));
        }
        //user.token = token;
        socket.user = user;
        //console.log("socket.user", socket.user)
        next();
    })
}

module.exports = authenticateTokenSocket