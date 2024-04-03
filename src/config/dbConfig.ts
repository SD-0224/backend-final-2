import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { ProductModel } from '../models/product';

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
env.DB_DATABASE, // database
env.DB_USERNAME, // username
env.DB_PASSWORD, // password
{
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: env.DB_DIALECT,
  pool: {
    max: 10,
    min: 1
  },
  logging: console.log,

});

async function syncModels() {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
      await ProductModel.sync();
  
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }
  

export {sequelize, syncModels};