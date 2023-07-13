const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const operations = require("./helpers/operations");
const authConfig = require("../config/authConfig");

const dataPath = authConfig.dataPath;

exports.register = (req, res) => {

    operations.readFile((data) => {

        const username = req.body["username"];
        const password = req.body["password"];
        bcrypt.hash(password, saltOrRounds = saltRounds).then((hash) => {
            
            let registration = { username: username, password: hash }
            data.push(registration);
            
            operations.writeFile(JSON.stringify(data, null, 2), () => {
                return res.status(200).json({ message : `user ${username} added` });
            }, dataPath)

        });
        
    }, true, dataPath);
}

exports.login = async (req, res) => {

    operations.readFile((data) => {

        const username = req.body["username"];
        const password = req.body["password"];
        
        const user = data.find(function(userEntry) {
            return userEntry.username === username;
        });
        
        if (typeof user === 'undefined') {

            return res.status(404).json({ message: "Login Failed: User Doesn't Exist" });
        } 

        bcrypt.compare(password, user["password"]).then((match) => {

            if (!match) {

                return res.status(401).json({ 
                    accessToken: null,
                    message: "Login Failed: Wrong Username/Password Combination" 
                });

            } else {

                const token = jwt.sign({ name: user.username },
                    authConfig.secret,
                    {
                        algorithm: 'HS256',
                        allowInsecureKeySizes: true,
                        expiresIn: 1000
                    }
                );
        
                return res.status(200).json({
                    username: user.username,
                    accessToken: token
                });
            }
        });
        
    }, true, dataPath);
}