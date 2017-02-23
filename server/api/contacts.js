var express = require('express');
var router = express.Router();
var fileStorage = require('../fileStorage');

router.route('/contacts')
    .get(function(req, res) { // get all contacts
        try {
            var data = fileStorage.getDataFromFile();
            res.send(data.contacts);
        } catch (err) {
            res.status(500).send(err.message)
        }
    })
    .post(function(req, res) { // create new contact
        try {
            var data = fileStorage.getDataFromFile();
            var contactFromRequest = req.body;
            if (!contactFromRequest.id) {
                throw new Error('contact.id is mandatory');
            }
            data.contacts[contactFromRequest.id] = contactFromRequest;
            fileStorage.saveDataToFile(data);
            res.send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message)
        }
    })
    .put(function(req, res) { // update existing contact
        try {
            var data = fileStorage.getDataFromFile();
            var contactFromRequest = req.body;
            var contact = fileStorage.getContactById(contactFromRequest.id);
            contact.name = contactFromRequest.name;
            contact.phone = contactFromRequest.phone;
            contact.email = contactFromRequest.email;
            contact.group = contactFromRequest.group;
            fileStorage.saveDataToFile(data);
            res.send(data);
        } catch (err) {
            res.status(500).send(err.message)
        }
    });

router.route('/contacts/:id')
    .get(function(req, res) { // get contact by id
        try {
            var contact = fileStorage.getContactById(req.params.id);
            res.send(contact);
        } catch (err) {
            res.status(500).send(err.message)
        }
    })
    .delete(function(req, res) { // delete contact by id
        var data = fileStorage.getDataFromFile();
        delete data.contacts[req.params.id];
        fileStorage.saveDataToFile(data);
        res.sendStatus(204);
    });

module.exports = router;