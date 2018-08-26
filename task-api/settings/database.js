'use strict';
const mongoose = require('mongoose');
const dbConfig = require('config').get('db');
global.toObjectId = id => mongoose.Types.ObjectId(id);

module.exports.configure = function(app) {
    mongoose.Promise = global.Promise;

    var connect = function() {
        console.log('connecting to', dbConfig);
        mongoose.connect(dbConfig.host);
    };

    connect();

    var db = mongoose.connection;

    db.on('connected', function() {
        console.log('DB Connected');
    });

    db.on('error', function(err) {
        console.log('Mongoose default connection error: ' + err);
    });

    db.on('disconnected', function() {
        console.log('Again going to connect DB');
        connect();
    });

    global.db = require('../models');
    return global.db;
};