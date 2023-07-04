const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

verifyToken = (req, res, next) => {

    let token = req.headers["x-access-token"];

    if (!token) {

        return res.status(403).json({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err) => {

        if (err) {

            return res.status(401).json({
                message: "Unauthorized Access: " + err.message
            });

        }
    });

    next();
}

module.exports = verifyToken;