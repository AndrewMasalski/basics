var fs = require('fs');
var dataFile = './data.json';

function getDataFromFile() {
    if (fs.existsSync(dataFile)) {
        return require(dataFile);
    }
    var data = {
        contacts: {}
    };
    saveDataToFile(data);
    return data;
}

function saveDataToFile(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

function getContactById(id) {
    var data = getDataFromFile();
    var contact = data.contacts[id];
    if (contact === undefined) {
        throw new Error('Contact with id:' + id + ' is not found.')
    }
    return contact;
}

module.exports = {
    getDataFromFile: getDataFromFile,
    saveDataToFile: saveDataToFile,
    getContactById: getContactById
};