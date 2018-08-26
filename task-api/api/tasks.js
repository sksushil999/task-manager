'use strict';

let mapper = require('../mappers/task');
const updationScheme = require('../helpers/updateEntities');



exports.create = async(req, res) => {


    try {

        let data = {
            title: req.body.title,
            description: req.body.description,
            estimate: req.body.estimate,
            reporter: req.user,
        };
        if (req.body.assigne && req.body.assigne.id) {
            data.assigne = req.body.assigne.id
        }
        if (req.body.project && req.body.project.id) {
            data.project = req.body.project.id
        }
        if (req.body.sprint && req.body.sprint.id) {
            data.sprint = req.body.sprint.id
        }
        let task = await new db.task(data).save();
        return res.data(mapper.toModel(task));

    } catch (e) {
        return res.failure(e);
    }

};

exports.update = async(req, res) => {
    let model = req.body;

    if (model.reporter) {
        delete model.reporter
    }

    if (model.assigne && model.assigne.id) {
        model.assigne = req.body.assigne.id
    }
    if (model.project && req.body.project.id) {
        model.project = req.body.project.id
    }
    if (req.body.sprint && req.body.sprint.id) {
        model.sprint = req.body.sprint.id
    }

    try {
        let task = await db.task.findById(req.params.id);
        if (!task) {
            throw "task not found";
        }
        task = updationScheme.update(model, task);
        task = await task.save();
        return res.data(mapper.toModel(task));
    } catch (e) {
        return res.failure(e);
    }
};

exports.get = async(req, res) => {
    try {
        let task = await db.task.findById(req.params.id);
        if (!task) {
            throw 'no taskfound';
        }
        return res.data(mapper.toModel(task));
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

    if (req.query.assigne) {
        query.assigne = toObjectId(req.query.assigne)
    }
    if (req.query.reporter) {
        query.reporter = toObjectId(req.query.reporter)
    }

    if (req.query.title) {
        query.title = {
            $regex: '^' + req.query.title + '$',
            $options: 'i'
        }
    }

    let promises = [db.task.find(query).count()];
    if (serverPaging) {
        promises.push(db.task.find(query).populate('assigne').skip(fromPage).limit(pageLmt));
    } else {
        promises.push(db.task.find(query).populate('assigne'));
    }

    try {
        let result = await Promise.all(promises)
        return res.page(mapper.toSearchModel(result[1]), PageNo, pageLmt, result[0]);
    } catch (err) {
        res.failure(err);
    }
};

exports.delete = (req, res) => {
    let taskId = req.params.id;

    db.task.findById(taskId)
        .then(task => {
            if (!task) return res.failure(`task not found`);
            task.remove().then(() => {
                return res.success('task deleted successfully ');
            }).catch(err => res.failure(err))
        }).catch(err => res.failure(err))
};