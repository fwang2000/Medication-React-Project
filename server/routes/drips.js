const operations = require('./operations');

const dripRoutes = (app, fs) => {

    const dataPath = './data/drip.json';
    
    app.get('/drip', (req, res) => {

        operations.readFile((data) => {
            res.send(data)
        }, true, dataPath);
    });
};

module.exports = dripRoutes;