"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
var dataStructures_1 = require("../decorators/dataStructures");
function use(middleware) {
    return function (target, key, desc) {
        var middlewares = Reflect.getMetadata(dataStructures_1.MetadataKeys.Middleware, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(dataStructures_1.MetadataKeys.Middleware, middlewares, target, key);
    };
}
exports.use = use;
