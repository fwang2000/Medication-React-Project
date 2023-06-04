const medicationRoutes = (app, fs) => {

    const dataPath = './data/medication.json';

    const readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {

        fs.readFile(dataPath, 'utf8', (err, data) => {
            
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    }

    const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = 'utf-8'
    ) => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        })
    }

    app.get('/medications', (req, res) => {

        readFile((data) => {
            res.send(data)
        }, true);
    });

    app.post('/medications', (req, res) => {

        writeFile
    })
};

module.exports = medicationRoutes;