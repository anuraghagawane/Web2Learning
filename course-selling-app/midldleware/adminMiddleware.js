const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const adminAuthMiddleware = (req, res, next) => {
    const token = req.headers.token;

    const decodedToken = jwt.verify(token, JWT_ADMIN_SECRET);

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
    adminAuthMiddleware
}