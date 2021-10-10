"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    Name: { type: String, required: true },
    Email: { type: String, unique: true, required: true },
});
exports.User = mongoose_1.model('User', UserSchema);
