const verifySignUp = require("../middleware");
const authController = require("../controllers/authController");

const authRoutes = (app) => {

    app.use(function(req, res, next) {
        
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/register", [verifySignUp.verifySignUp],
        authController.register
    );

    app.post("/login", authController.login);
}

module.exports = authRoutes;