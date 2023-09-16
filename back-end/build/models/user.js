"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFactory = exports.user = void 0;
const sequelize_1 = require("sequelize");
class user extends sequelize_1.Model {
}
exports.user = user;
function userFactory(sequelize) {
    user.init({
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        spent: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        clientIds: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        tableName: 'users',
        sequelize,
        collate: 'utf8_general_ci',
    });
}
exports.userFactory = userFactory;
