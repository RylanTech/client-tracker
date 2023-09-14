import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class client extends Model<InferAttributes<client>, InferCreationAttributes<client>>{
    declare clientId: number;
    declare name: string;
    declare email: string;
    declare imageUrl: string;
    declare userId: number;
}

export function clientFactory(sequelize: Sequelize) {
    client.init({
        clientId: {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
    },
        {
            freezeTableName: true,
            tableName: 'clients',
            sequelize,
            collate: 'utf8_general_ci',
        })
}