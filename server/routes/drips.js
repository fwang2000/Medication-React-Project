const dripRoutes = (app, fs) => {

    const dataPath = './data/drip.json';

    app.get('/drip', (req, res) => {

        fs.readFile(dataPath, 'utf8', (err, data) => {
            
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
};

module.exports = dripRoutes;