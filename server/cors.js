module.exports = function allowCrossDomain(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//    var origin = req.headers.origin || '*';
    var origin = '*';
    res.setHeader('Access-Control-Allow-Origin', origin);

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}
