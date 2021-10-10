"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("./AppRouter");
var dataStructures_1 = require("./controllers/decorators/dataStructures");
// automate checking process for keys in the req body
function validateBody(keys) {
    return function (req, res, next) {
        // check if the body doesn't exist
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        // check if all the keys exist in the body
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("Missing property " + key);
                return;
            }
        }
        // if all is fine, move on to the next function
        next();
    };
}
function controller(routerPrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        console.log('target', target);
        for (var key in target.prototype) {
            console.log('methods', key);
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(dataStructures_1.MetadataKeys.Path, target.prototype, key);
            var method = Reflect.getMetadata(dataStructures_1.MetadataKeys.Method, target.prototype, key);
            var middlewares = Reflect.getMetadata('middleware', target.prototype, key) || [];
            // store the req body
            var requiredBodyProperties = Reflect.getMetadata(dataStructures_1.MetadataKeys.Validator, target.prototype, key) ||
                [];
            // validate the req body
            var validatedBody = validateBody(requiredBodyProperties);
            if (path) {
                router[method].apply(router, __spreadArray(__spreadArray(["" + routerPrefix + path], middlewares), [validatedBody,
                    routeHandler]));
            }
        }
    };
}
exports.controller = controller;
