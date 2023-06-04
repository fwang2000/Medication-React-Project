const dripRoutes = require('./drips');
const medicationRoutes = require('./medications');

const appRouter = (app, fs) => {

    app.get('/', (req, res) => {

        res.send('Welcome to the Dev Server');
    });

    medicationRoutes(app, fs);
    dripRoutes(app, fs);
};

module.exports = appRouter;