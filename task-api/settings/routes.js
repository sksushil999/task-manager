'use strict';
const fs = require('fs');
const apiRoutes = require('../helpers/apiRoute');
var auth = require('../middlewares/authorization');

module.exports.configure = (app) => {
    let title = 'TASK API'

    app.get('/', (req, res) => {
        res.render('index', {
            title: title
        });
    });

    app.get('/api', (req, res) => {
        res.render('index', {
            title: title
        });
    });

    app.get('/swagger', (req, res) => {
        res.writeHeader(200, {
            "Content-Type": "text/html"
        });
        fs.readFile('./public/swagger/index.html', null, function(err, data) {
            if (err) {
                res.writeHead(404);
            }
            res.write(data);
            res.end();
        });
    });

    let api = apiRoutes(app);

    api.model('qrs').register('REST');
    api.model('users').register('REST', auth.requiresToken);

    api.model('users')
        .register([{
            action: 'POST',
            method: 'signin',
            url: '/signin',
        }, {
            action: 'POST',
            method: 'upload',
            url: '/image/upload',
        }, , {
            action: 'POST',
            method: 'simplePost',
            url: '/simple/post',
        }]);
    api.model('tasks').register('REST', auth.requiresToken);


}