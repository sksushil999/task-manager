'use strict';

let mapper = require('../mappers/user');
let auth = require('../middlewares/authorization');
const updationScheme = require('../helpers/updateEntities');

exports.signin = async(req, res) => {

    try {

        let email = req.body.email;
        let password = req.body.password;

        if (!email) {
            throw "enter userName";
        }
        if (!password) {
            throw "enter password";
        }

        let user = await db.user.findOne({ email: email });
        if (!user) {
            throw 'User Not Found';
        }

        var isPasswordMatch = await auth.comparePassword(password, user.password);
        if (isPasswordMatch) {
            if (!user.token) {
                user.token = auth.getToken(user);
                user = await user.save();
            }
            return res.data(mapper.toAuthModel(user));
        } else {
            throw "Invalid username or password.";
        }
    } catch (e) {
        return res.failure(e);
    }
};

exports.create = async(req, res) => {

    if (!req.body.email) {
        return res.failure("enter email");
    }

    try {
        let user = await db.user.findOne({ 'email': req.body.email });
        if (user) {
            throw 'User already exist'
        }

        let data = {
            email: req.body.email,
            name: req.body.name || req.body.email,
        };
        user = await new db.user(data).save();

        user.token = auth.getToken(user);
        if (req.body.password) {
            var hash = await auth.setPassword(req.body.password);
            user.password = hash;
        }
        user = await user.save();

        return res.data(mapper.toModel(user));

    } catch (e) {
        return res.failure(e);
    }

};

exports.update = async(req, res) => {
    let model = req.body;

    try {
        let user = await db.user.findById(req.params.id);
        if (!user) {
            throw "user not found";
        }
        user = updationScheme.update(model, user);

        if (model.password) {
            var hash = await auth.setPassword(model.password);
            user.password = hash;
        }

        user = await user.save();
        return res.data(mapper.toModel(user));
    } catch (e) {
        return res.failure(e);
    }
};

exports.get = async(req, res) => {
    try {
        let user = await db.user.findById(req.params.id);
        if (!user) {
            throw 'no userfound';
        }
        return res.data(mapper.toModel(user));
    } catch (e) {
        return res.failure(e);
    }
};

exports.search = async(req, res) => {
    let PageNo = Number(req.query.pageNo || 1);
    let pageSize = Number(req.query.pageSize);
    let toPage = (PageNo || 1) * (pageSize || 10);
    let fromPage = toPage - (pageSize || 10);
    let pageLmt = (pageSize || 10);
    let totalRecordsCount = 0;
    let serverPaging = req.query.serverPaging == "false" ? false : true;

    let query = {};

    if (req.query.status) {
        query.status = req.query.status;
    }
    if (req.query.name) {
        query.name = {
            $regex: '^' + req.query.name + '$',
            $options: 'i'
        }
    }
    if (req.query.email) {
        query.email = {
            $regex: '^' + req.query.email + '$',
            $options: 'i'
        }
    }


    let promises = [db.user.find(query).count()];
    if (serverPaging) {
        promises.push(db.user.find(query).skip(fromPage).limit(pageLmt));
    } else {
        promises.push(db.user.find(query));
    }

    try {
        let result = await Promise.all(promises)
        return res.page(mapper.toSearchModel(result[1]), PageNo, pageLmt, result[0]);
    } catch (err) {
        res.failure(err);
    }
};

exports.delete = (req, res) => {
    let userId = req.params.id;

    db.user.findById(userId)
        .then(user => {
            if (!user) return res.failure(`user not found`);
            user.remove().then(() => {
                return res.success('user deleted successfully ');
            }).catch(err => res.failure(err))
        }).catch(err => res.failure(err))
};