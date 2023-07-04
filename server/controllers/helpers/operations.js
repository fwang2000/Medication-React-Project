const fs = require('fs');

exports.readFile = (
    callback,
    returnJson = false,
    filePath,
    encoding = 'utf8'
) => {

    fs.readFile(filePath, encoding, (err, data) => {
        
        if (err) {
            throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
    });
}

exports.writeFile = (
    fileData,
    callback,
    filePath,
    encoding = 'utf-8'
) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    })
}