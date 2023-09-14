import { Sequelize } from "sequelize";
// import 'dotenv/config';
import { userFactory } from "./user";
import { gigFactory } from "./gigs";
import { clientFactory } from "./clients";

const dbName = process.env.DB_NAME ?? '';
const username = process.env.DB_USER ?? '';
const password = process.env.DB_PASS ?? '';

const sequelize = new Sequelize("ctdb", "root", "0624", {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

userFactory(sequelize)
gigFactory(sequelize)
clientFactory(sequelize)


export const db = sequelize;