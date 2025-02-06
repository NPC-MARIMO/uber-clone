const userModel = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        res.status(401).json({message : "Unauthorised"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("JWT Verification Error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized, token expired" });
        }
        return res.status(401).json({ message: "Unauthorized" });
    }
};
