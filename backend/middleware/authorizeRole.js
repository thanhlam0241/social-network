const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).send("Access denied! You need have role in [" + roles.join(',') + "] to continue");
        }
        next();
    }
}

module.exports = authorizeRole;