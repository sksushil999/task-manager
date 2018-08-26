'usee strict';
const _ = require('underscore');
exports.toModel = (entity) => {
    const model = {
        id: entity._id.toJSON() || entity.id,
        name: entity.name,
        email: entity.email,
        status: entity.status,
        role: entity.role,
        password: null
    };
    return model;
}

exports.toSearchModel = entities => {
    return _.map(entities, exports.toModel);
};


exports.toAuthModel = (entity) => {
    let model = exports.toModel(entity);
    model.token = entity.token;
    return model;
}