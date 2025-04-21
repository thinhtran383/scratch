import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();


const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
    },
    logging: console.log,
});

export default sequelize;
