require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateTokenSocket = (socket, next) => {
    const token = socket.handshake.token;
    if (token == null) {
        return res.status(401).send("Token is required");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send("Token is invalid");
        }
        user.token = token;
        socket.user = user;
        next();
    })
}

module.exports = authenticateTokenSocket