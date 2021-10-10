"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
var ResponseHandler = /** @class */ (function () {
    function ResponseHandler() {
    }
    ResponseHandler.prototype.success = function (msg) {
        return {
            message: msg,
        };
    };
    ResponseHandler.prototype.error = function (msg, err) {
        return {
            message: msg,
            error: err,
        };
    };
    return ResponseHandler;
}());
exports.ResponseHandler = ResponseHandler;
