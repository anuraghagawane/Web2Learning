const MONGODB_URL = process.env.MONGODB_URL;
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET
const JWT_USER_SECRET = process.env.JWT_USER_SECRET

module.exports = {
    MONGODB_URL,
    JWT_ADMIN_SECRET,
    JWT_USER_SECRET
}