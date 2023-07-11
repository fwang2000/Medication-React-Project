const operations = require("../controllers/helpers/operations");
const authConfig = require("../config/authConfig");
const dataPath = authConfig.dataPath;

checkDuplicateUsername = (req, res, next) => {

    operations.readFile((data) => {

        const username = req.body["username"];

        const user = data.find(function(userEntry) {
            return userEntry.username === username;
        });

        if (typeof user !== "undefined") {

            return res.status(400).json({
                message: "Username is already taken!"
            });
        }
        
    }, true, dataPath);

    next();
}

module.exports = checkDuplicateUsername;