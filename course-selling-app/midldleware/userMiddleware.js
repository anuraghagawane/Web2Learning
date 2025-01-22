const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
const userAuthMiddleware = (req, res, next) => {
    const token = req.headers.token;

    const decodedToken = jwt.verify(token, JWT_USER_SECRET);

    if (!decodedToken) {
        res.status(401).json({
            message: "Authentication failed"
        })
        return;
    }

    req.id = decodedToken.id;

    next();
}

module.exports = {
    userAuthMiddleware
}