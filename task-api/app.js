var express = require('express');
var http = require('http');
var config = require('config').get('webServer');
const cors = require('cors');

var app = express();

function corsCallback(err, allow) {
    console.log('Inside Callback')
    console.log(err, allow)
}
// app.use(cors({
//     origin: '*',
//     credentials: true
// }));

// app.options('/users/image/upload', cors());

// var allowCrossDomain = function(req, res, next) {
//     if (err) {
//         res.send(500, { error: err });
//         return;
//     }
//     // if ('OPTIONS' == req.method) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     next();
//     // res.send(200);
//     // } else {
//     //     next();
//     // }
// };

// app.use(allowCrossDomain);
const q = require('./qr');
const wemail = require('./webmail');

app.use(express.static(__dirname + '/api/uploads'));

try {
    require('./settings/database').configure();
    require('./settings/express').configure(app);
    require('./settings/routes').configure(app);
} catch (err) {
    console.log('err', err);
}



var server = http.createServer(app);

server.listen(config.port, function() {
    console.log('listening on port:' + config.port);
    // q.printName();
    q._generateQr();
    // wemail.sendMail();
});

module.exports = app;