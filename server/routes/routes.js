const dripRoutes = require('./drips');
const medicationRoutes = require('./medications');
const authRoutes = require('./auth');

const appRouter = (app) => {

    app.get('/', (req, res) => {

        res.send('Welcome to the Dev Server');
    });

    medicationRoutes(app);
    dripRoutes(app);
    authRoutes(app);
};

module.exports = appRouter;