'use strict';
const jwt = require('jsonwebtoken');
const db = global.db;
const authConfig = require('config').get('auth');
const bcrypt = require('bcrypt-nodejs');


const extractToken = async(token, req, res, next) => {
    try {
        let claims = await jwt.verify(token, authConfig.secret, { ignoreExpiration: true });
        if (!claims) {
            throw ('invalid token.');
        }
        let user = await db.user.findById(claims.user);

        if (!user) {
            throw ('no user found');
        }
        req.user = user;
        next();
    } catch (e) {
        return res.failure(e)
    }
};



exports.requiresToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'token is required.'
        });
    }

    extractToken(token, req, res, next);
};

exports.requiresTokenOptional = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token)
        return extractToken(token, req, res, next);

    req.user = null;
    next();
};

exports.getToken = user => {

    const claims = {
        user: user.id,
        phone: user.phone
    };

    return jwt.sign(claims, authConfig.secret, {
        expiresIn: authConfig.tokenPeriod || 1440
    });
};

exports.newPin = () => {
    return Math.floor(1000 + Math.random() * 9000);
};


exports.comparePassword = async(password, hash) => {
    return new Promise(async(resolve, reject) => {
        bcrypt.compare(password, hash, function(err, isPasswordMatch) {
            if (err) {
                return resolve(false);
            }
            return resolve(isPasswordMatch);
        });
    });
}

exports.setPassword = async(password) => {
    return new Promise(async(resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return resolve();
            }
            bcrypt.hash(password, salt, null, function(err, hash) {
                return resolve(hash);
            });
        });
    });
}