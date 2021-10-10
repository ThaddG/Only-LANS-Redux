"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
var controller_1 = require("../controller");
var decorators_1 = require("./decorators");
var models_1 = require("../models");
var dayjs_1 = __importDefault(require("dayjs"));
var MessageController = /** @class */ (function () {
    function MessageController() {
    }
    // create new message
    MessageController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, Sender, Content, ChatId, message, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, Sender = _a.Sender, Content = _a.Content, ChatId = _a.ChatId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        message = new models_1.Message({
                            Sender: Sender,
                            Content: Content,
                            CreatedDate: dayjs_1.default(),
                            ChatId: ChatId,
                        });
                        return [4 /*yield*/, message.save()];
                    case 2:
                        _b.sent();
                        res.send({ message: 'success', data: message });
                        return [2 /*return*/];
                    case 3:
                        err_1 = _b.sent();
                        res.status(500).send({ message: "Create new message error " + err_1 });
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // get all messages in a chat room
    MessageController.prototype.getMessagesFromChat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var chatIdParam, messages, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatIdParam = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // make sure the chat exists
                        return [4 /*yield*/, models_1.Chat.findById(chatIdParam, function (err) {
                                if (err)
                                    return res.status(400).send({ message: 'Invalid room id' });
                            })];
                    case 2:
                        // make sure the chat exists
                        _a.sent();
                        return [4 /*yield*/, models_1.Message.find({
                                ChatId: chatIdParam,
                            })];
                    case 3:
                        messages = _a.sent();
                        if (!messages) {
                            res.status(400).send('No messages returned');
                            return [2 /*return*/];
                        }
                        res.send({ message: 'success', data: messages });
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        res.status(500).send({ message: 'Query check failed' });
                        return [2 /*return*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // get messages sent by a user
    MessageController.prototype.getByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.id;
                        // get the user
                        return [4 /*yield*/, models_1.User.findById(userId, function (err) {
                                if (err)
                                    return res.status(400).send({ message: 'Invalid user id' });
                            })];
                    case 1:
                        // get the user
                        _a.sent();
                        return [4 /*yield*/, models_1.Message.find({
                                Sender: userId,
                            })];
                    case 2:
                        messages = _a.sent();
                        if (!messages) {
                            res.status(400).send('No messages returned');
                            return [2 /*return*/];
                        }
                        res.send({ message: 'success', data: messages });
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageController.prototype.getByUserAndChat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, chatId, messages, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, userId = _a.userId, chatId = _a.chatId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        // get the user
                        return [4 /*yield*/, models_1.User.findById(userId, function (err) {
                                if (err)
                                    return res.status(400).send({ message: 'Invalid user id' });
                            })];
                    case 2:
                        // get the user
                        _b.sent();
                        // make sure the chat exists
                        return [4 /*yield*/, models_1.Chat.findById(chatId, function (err) {
                                if (err)
                                    return res.status(400).send({ message: 'Invalid room id' });
                            })];
                    case 3:
                        // make sure the chat exists
                        _b.sent();
                        return [4 /*yield*/, models_1.Message.find({
                                Sender: userId,
                                ChatId: chatId
                            })];
                    case 4:
                        messages = _b.sent();
                        res.send({ message: 'success', data: messages });
                        return [3 /*break*/, 6];
                    case 5:
                        err_3 = _b.sent();
                        res
                            .status(500)
                            .send({ message: 'Get by user and chat error', error: err_3 });
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.post('/message'),
        decorators_1.reqBodyValidator('Sender', 'Content', 'ChatId'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], MessageController.prototype, "create", null);
    __decorate([
        decorators_1.get('/messages/chat/:id'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], MessageController.prototype, "getMessagesFromChat", null);
    __decorate([
        decorators_1.get('/messages/user/:id'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], MessageController.prototype, "getByUser", null);
    __decorate([
        decorators_1.get('/messages/user/:userId/chat/:chatId'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], MessageController.prototype, "getByUserAndChat", null);
    MessageController = __decorate([
        controller_1.controller('')
    ], MessageController);
    return MessageController;
}());
exports.MessageController = MessageController;
