"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = require("./models");
const userController_1 = require("./controllers/userController");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const gigRoutes_1 = __importDefault(require("./routes/gigRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// incoming requests
const cors = require('cors');
app.use(cors());
// Routing Middleware
app.use('/api/user/', userRoutes_1.default);
app.use('/api/client/', clientRoutes_1.default);
app.use('/api/gig/', gigRoutes_1.default);
app.use('/api/verify', userController_1.verify);
app.use((req, res, next) => {
    res.status(404).send("This is not the URL you are looking for!");
});
// Syncing DB
models_1.db.sync().then(() => {
    console.info("Connected to the database!");
});
app.listen(3001);
