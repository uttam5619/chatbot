import { Sequelize } from 'sequelize';
import {config} from 'dotenv';
config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false
});


export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection with database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
};


export const disconnectDB = async () => {
    try {
        await sequelize.close();
    }catch (error) {
        console.error('Unable to disconnect from the database:', error)
        process.exit(1);
  } 
};

export default sequelize;
