// require('dotenv-flow').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // console.log(req.cookies)
    const token = req.cookies.atk;
    if (token == null) {
        return res.status(401).send("Token is required");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // console.log(`error: ${err}`);
        // console.log(`user: ${user}`);
        if (err) {
            return res.status(403).send("Token is invalid");
        }
        user.token = token;
        req.user = user;
        next();
    })
}

module.exports = authenticateToken