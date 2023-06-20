const operations = require('./operations');

const medicationRoutes = (app, fs) => {

    const dataPath = './data/medication.json';

    app.get('/medications', (req, res) => {

        operations.readFile((data) => {
            res.send(data)
        }, true, dataPath);
    });

    app.post('/medications', (req, res) => {

        operations.readFile((data) => {

            // create new row id or something
            
            operations.writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new medication added')
            }, dataPath)
        }, true, dataPath);
    });

    app.put('/medications/:id', (req, res) => {

        operations.readFile((data) => {

            const medicationID = req.params['id'] - 1;
            data[medicationID] = req.body;

            operations.writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).json({ message : `medication id ${medicationID} updated` });
            }, dataPath);
        }, true, dataPath);
    });

    app.delete('/medications/:id', (req, res) => {

        operations.readFile((data) => {

            const medicationId = req.params['index'];
            delete data[medicationId];

            operations.writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`medication id ${medicationID} deleted`);
            }, dataPath);
        }, true, dataPath);
    });
};

module.exports = medicationRoutes;