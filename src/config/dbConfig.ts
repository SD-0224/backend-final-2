import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import * as db from '../models/index'
dotenv.config();
interface DbConfig {
    DB_HOST: string;
    DB_PORT: number;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DIALECT: 'mysql';
  }
const env: DbConfig = {
    DB_HOST: process.env.DB_HOST || '',
    DB_PORT: parseInt(process.env.DB_PORT || '0', 10),
    DB_DATABASE: process.env.DB_DATABASE || '',
    DB_USERNAME: process.env.DB_USERNAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_DIALECT: process.env.DB_DIALECT as 'mysql' ,
  };

const sequelize = new Sequelize(
{
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  logging: console.log,
});

async function syncModels():Promise<void> {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
      await sequelize.sync({force:true});
  
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }
  

export {sequelize, syncModels};