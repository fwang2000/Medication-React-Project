const operations = require("./helpers/operations");
const dripConfig = require("../config/dripConfig");
const dataPath = dripConfig.dataPath;

exports.getDripOrders = (req, res) => {

    operations.readFile((data) => {
        res.send(data)
    }, true, dataPath);
}

exports.addDripOrder = (req, res) => {

    operations.readFile((data) => {

        const index = Object.keys(data).length;
        data[index] = req.body;
        data[index]['parameterguid'] = Math.floor(1000 + Math.random() * 9000);
        
        operations.writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).json({ message : `drip order ${req.body['parameterguid']} added` })
        }, dataPath)
    }, true, dataPath);
}

exports.updateDripOrder = (req, res) => {

    operations.readFile((data) => {

        const dripOrderIndex = data.findIndex(function(order) {
            return order.parameterguid === parseInt(req.params['id']);
        });
        data[dripOrderIndex] = req.body;

        operations.writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).json({ message : `drip-order ${req.params['id']} updated` });
        }, dataPath);
    }, true, dataPath);
}

exports.deleteDripOrder = (req, res) => {

    operations.readFile((data) => {
        
        const dripOrderIndex = data.findIndex(function(order) {
            return order.parameterguid === parseInt(req.params['id']);
        });

        data.splice(dripOrderIndex, 1);

        operations.writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).json(
                {
                    message : `drip order ${req.params['id']} deleted`
                }
            );
        }, dataPath);
    }, true, dataPath);
}