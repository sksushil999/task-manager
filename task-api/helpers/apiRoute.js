'use strict';
var _ = require('underscore');
var responseHelper = require('./response');

var responseDecoratorFn = function(req, res, next) {
    var wrapper = responseHelper(res);
    res.failure = wrapper.failure;
    res.success = wrapper.success;
    res.page = wrapper.page;
    res.pageWithPaging = wrapper.pageWithPaging;
    res.data = wrapper.data;
    next();
};


module.exports = function(app) {

    let apiRoot, requiredModule;
    var tasks = [];

    let register = function(option, filters) {

        if (_.isEmpty(requiredModule)) {
            return;
        }

        tasks.push(responseDecoratorFn);

        if (typeof(option) === "string" && option.toUpperCase() === 'REST' ||
            typeof(option) === "string" && option.toUpperCase() === 'CRUD') {
            if (filters) {
                tasks.push(filters);
            }
            (function() {
                let apiUrl = apiRoot + '/:id';

                if (requiredModule.get) {
                    tasks.push(requiredModule.get);
                    app.get(apiUrl, tasks);
                    tasks.pop();
                }
                if (requiredModule.search) {
                    tasks.push(requiredModule.search);
                    app.get(apiRoot, tasks);
                    tasks.pop();
                }
                if (requiredModule.update) {
                    tasks.push(requiredModule.update);
                    app.put(apiUrl, tasks);
                    tasks.pop();
                }
                if (requiredModule.create) {
                    tasks.push(requiredModule.create);
                    app.post(apiRoot, tasks);
                    tasks.pop();
                }
                if (requiredModule.delete) {
                    tasks.push(requiredModule.delete);
                    app.delete(apiUrl, tasks);
                    tasks.pop();
                }

            })();
        }

        if (typeof(option) === "object" && !filters) { //come as array or object
            var options = [];

            if (option[0]) {
                options = option;
            } else {
                options.push(option);
            }

            options.forEach(function(item) {
                let filters = [];

                filters = item.filters ? item.filters : [];

                if (item.filter) {
                    filters.push(item.filter);
                }

                filters.forEach(item => tasks.push(item));

                tasks.push(requiredModule[item.method]);

                let apiUrl = item.url ? apiRoot + item.url : apiRoot;

                switch (item.action.toUpperCase()) {
                    case "GET":
                        app.get(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "POST":
                        app.post(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "PUT":
                        app.put(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "DELETE":
                        app.delete(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    default:
                        break;
                }

            });
        }
        tasks = [];
        return;

    };

    return {
        model: function(apiType) {

            if (apiType.charAt(apiType.length - 1) !== 's' &&
                apiType.substr(apiType.length - 2, apiType.length) !== 'es') {
                throw ('enter correct api');
            }

            apiRoot = '/api/' + apiType;
            requiredModule = require(`..${apiRoot}`);
            return { register: register };
        }
    };
};