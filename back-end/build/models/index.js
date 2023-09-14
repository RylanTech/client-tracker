"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
// import 'dotenv/config';
const user_1 = require("./user");
const dbName = process.env.DB_NAME ?? '';
const username = process.env.DB_USER ?? '';
const password = process.env.DB_PASS ?? '';
const sequelize = new sequelize_1.Sequelize("ctdb", "root", "0624", {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});
(0, user_1.userFactory)(sequelize);
exports.db = sequelize;
