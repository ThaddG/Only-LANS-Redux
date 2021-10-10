"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    Sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    Content: String,
    CreatedDate: Date,
    UpdatedDate: Date,
    ChatId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Chat',
    },
});
exports.Message = mongoose_1.model('Message', MessageSchema);
