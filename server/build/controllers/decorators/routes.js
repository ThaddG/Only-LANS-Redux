"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.patch = exports.put = exports.post = exports.get = void 0;
require("reflect-metadata");
var dataStructures_1 = require("./dataStructures");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(dataStructures_1.MetadataKeys.Path, path, target, key);
            Reflect.defineMetadata(dataStructures_1.MetadataKeys.Method, method, target, key);
        };
    };
}
exports.get = routeBinder(dataStructures_1.Methods.Get);
exports.post = routeBinder(dataStructures_1.Methods.Post);
exports.put = routeBinder(dataStructures_1.Methods.Put);
exports.patch = routeBinder(dataStructures_1.Methods.Patch);
exports.del = routeBinder(dataStructures_1.Methods.Del);
