import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class gig extends Model<InferAttributes<gig>, InferCreationAttributes<gig>>{
    declare gigId: number;
    declare clientId: number;
    declare userId: number;
    declare gigName: string;
    declare gigValue: number;
    declare gigCost: number;
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
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        gigName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gigValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gigCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gigFeatures: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        gigTimeSpent: {
            type: DataTypes.INTEGER,
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