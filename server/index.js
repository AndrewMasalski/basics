var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var api = require('./api');
var app = express();

app.use(require('./cors'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', api);
app.listen(3003, function() {
    console.log('phone book server started: ' + 'http://localhost:3003/api'.underline.green)
});


