import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class gig extends Model<InferAttributes<gig>, InferCreationAttributes<gig>>{
    declare gigId: number;
    declare clientId: number;
    declare userId: number;
    declare gigName: string;
    declare gigValue: number;
    declare gigCost: string;
    declare gigFeatures: string;
    declare gigTimeSpent: number;
}

export function gigFactory(sequelize: Sequelize) {
    gig.init({
        gigId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        clientId: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        userId: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        gigName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gigValue: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        gigCost: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        gigFeatures: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        gigTimeSpent: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    },
        {
            freezeTableName: true,
            tableName: 'gigs',
            sequelize,
            collate: 'utf8_general_ci',
        })
}