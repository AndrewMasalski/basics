var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var api = require('./contacts');
var app = express();

var port = 3003;
var host = 'http://localhost:' + port;

var router = express.Router();

router.route('/')
    .get(function(req, res) {
        res.send({
            contacts: host + '/api/contacts'
        });
    });

app.use(require('./cors'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', api);
app.use('/api', router);

app.listen(port, function() {
    console.log('phone book server started: ' + (host + '/api').underline.green)
});


