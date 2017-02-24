var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var app = express();

var port = 3003;
var host = 'http://localhost:' + port;

app.use(require('./cors'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function() {
    console.log('phone book server started: ' + (host + '/api').underline.green)
});


