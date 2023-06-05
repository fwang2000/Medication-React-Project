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
            })
        }, true, dataPath);
    });

    app.put('/medications/:id', (req, res) => {

        operations.readFile((data) => {

            // get row ID
            const medicationID = req.params['id'];
            data[medicationID] = req.body;

            operations.writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`medication id ${medicationID} updated`);
            });
        }, true, dataPath);
    });

    app.delete('/medications/:id', (req, res) => {

        operations.readFile((data) => {

            const medicationId = req.params['id'];
            delete data[medicationId];

            operations.writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`medication id ${medicationID} deleted`);
            });
        }, true, dataPath);
    });
};

module.exports = medicationRoutes;