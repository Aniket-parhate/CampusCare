const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const Staff = require("../models/staffSchema");

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized, token missing"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

     
        let account = await User.findById(decoded.id).select("-password");

        let accountType = "user";

     
        if (!account) {
            account = await Staff.findById(decoded.id).select("-password");
            accountType = "staff";
        }

        if (!account) {
            return res.status(401).json({
                message: "User no longer exists"
            });
        }

        req.account = account;
        req.accountType = accountType;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = protect;