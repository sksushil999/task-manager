'usee strict';
const _ = require('underscore');
const userMapper = require('./user');

exports.toModel = (entity) => {
    const model = {
        id: entity._id.toJSON() || entity.id,
        title: entity.title,
        description: entity.description,
        estimate: entity.estimate,
        taskType: entity.taskType,
        status: entity.status,
    };

    if (entity.reporter) {
        model.reporter = userMapper.toModel(entity.reporter);
    }
    if (entity.assigne) {
        model.assigne = userMapper.toModel(entity.assigne);
    }
    return model;

}

exports.toSearchModel = entities => {
    return _.map(entities, exports.toModel);
};