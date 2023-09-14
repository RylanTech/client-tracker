import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class user extends Model<InferAttributes<user>, InferCreationAttributes<user>>{
    declare userId: number;
    declare email: string;
    declare password: string;
    declare value: number;
    declare spent: number;
    declare clientIds: string;
}

export function userFactory(sequelize: Sequelize) {
    user.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        spent: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        clientIds: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
        {
            freezeTableName: true,
            tableName: 'users',
            sequelize,
            collate: 'utf8_general_ci',
        })
}