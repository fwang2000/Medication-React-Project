const fs = require('fs');

const readFile = (
    callback,
    returnJson = false,
    filePath,
    encoding = 'utf8'
) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
        
        if (err) {
            throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
    });
}

const writeFile = (
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

exports.readFile = readFile;
exports.writeFile = writeFile;