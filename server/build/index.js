"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var AppRouter_1 = require("./AppRouter");
// CONTROLLERS
require("./controllers/AuthController");
require("./controllers/ChatController");
require("./controllers/MessageController");
var env = dotenv_1.default.config();
var app = express_1.default();
var router = AppRouter_1.AppRouter.getInstance();
// MONGODB SETUP
var mongoUri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@cluster0.fvknh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// CONNECT MONGOOSE
mongoose_1.default.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose_1.default.connection.on('connected', function () {
    console.log('Connected to mongo instance');
});
mongoose_1.default.connection.on('error', function (err) {
    console.error('Error connecting to mongo', err);
});
app.use(express_1.default.json());
// app.use(router);
app.use(AppRouter_1.AppRouter.getInstance());
router.get('/', function (req, res) {
    res.send("\n    <div>\n      <h1>Home Page</h1>\n    </div>\n  ");
});
app.listen(4000, function () {
    console.log('listening on port 4000');
});
