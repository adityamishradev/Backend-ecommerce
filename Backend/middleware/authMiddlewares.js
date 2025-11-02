
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Middleware to protect routes
async function Authenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id).select('-password');
        next();
    }
    catch (error) {
        res.sendStatus(403);
    }
}

module.exports = {
    Authenticated,
};
