const operations = require("./helpers/operations");

exports.getMedication = (req, res) => {

    operations.readFile((data) => {
        res.send(data)
    }, true, dataPath);
}

exports.addMedication = (req, res) => {

    operations.readFile((data) => {

        const medicationID = parseInt(data[Object.keys(data).length-1].index);
        data[medicationID] = req.body;
        data[medicationID]["index"] = (medicationID + 1).toString();
        
        operations.writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).json({ message : `medication added` })
        }, dataPath)
    }, true, dataPath);
}

exports.updateMedication = (req, res) => {

    operations.readFile((data) => {

        const medicationID = req.params['index'] - 1;
        data[medicationID] = req.body;

        operations.writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).json({ message : `medication id ${medicationID} updated` });
        }, dataPath);
    }, true, dataPath);
}

exports.deleteMedication = (req, res) => {

    operations.readFile((data) => {

        const medicationId = parseInt(req.params['index']) - 1;

        for (let i = medicationId; i< Object.keys(data).length; i++) {
            let index = parseInt(data[i]['index']);
            data[i]['index'] = (index - 1).toString();
        }

        data.splice(medicationId, 1);

        operations.writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).json(
                {
                    message : `medication id ${medicationId} deleted`
                });
        }, dataPath);
    }, true, dataPath);
}