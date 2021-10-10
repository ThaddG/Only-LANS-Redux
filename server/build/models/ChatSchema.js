"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
var mongoose_1 = require("mongoose");
var ChatSchema = new mongoose_1.Schema({
    CreatedDate: { type: Date, index: true },
});
exports.Chat = mongoose_1.model('Chat', ChatSchema);
