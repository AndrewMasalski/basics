var express = require('express');
var fs = require('fs');
var router = express.Router();

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

router.route('/contacts')
    // get all contacts
    .get(function(req, res) {
        try {
            var data = getDataFromFile();
            res.send(data.contacts);
        } catch (err) {
            res.status(500).send(err.message)
        }
    })
    // create new contact
    .post(function(req, res) {
        try {
            var data = getDataFromFile();
            var contactFromRequest = req.body;
            if (!contactFromRequest.id) {
                throw new Error('contact.id is mandatory');
            }
            data.contacts[contactFromRequest.id] = contactFromRequest;
            saveDataToFile(data);
            res.send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message)
        }
    })
    // update existing contact
    .put(function(req, res) {
        try {
            var data = getDataFromFile();
            var contactFromRequest = req.body;
            var contact = getContactById(contactFromRequest.id);
            contact.name = contactFromRequest.name;
            contact.phone = contactFromRequest.phone;
            contact.email = contactFromRequest.email;
            contact.group = contactFromRequest.group;
            saveDataToFile(data);
            res.send(data);
        } catch (err) {
            res.status(500).send(err.message)
        }
    });

router.route('/contacts/:id')
    // get contact by id
    .get(function(req, res) {
        try {
            var contact = getContactById(req.params.id);
            res.send(contact);
        } catch (err) {
            res.status(500).send(err.message)
        }
    })
    // delete contact by id
    .delete(function(req, res) {
        var data = getDataFromFile();
        delete data.contacts[req.params.id];
        saveDataToFile(data);
        res.sendStatus(204);
    });

module.exports = router;