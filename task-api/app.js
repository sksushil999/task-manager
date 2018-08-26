var express = require('express');
var http = require('http');
var config = require('config').get('webServer');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(express.static(__dirname + '/api/uploads'));

try {
    require('./settings/database').configure();
    require('./settings/express').configure(app);
    require('./settings/routes').configure(app);
} catch (err) {
    console.log('err', err);
}

app.use((err, req, res, next) => {
    if (err) {
        res.send(500, { error: err });
        return;
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

var server = http.createServer(app);

server.listen(config.port, function() {
    console.log('listening on port:' + config.port);
});

module.exports = app;