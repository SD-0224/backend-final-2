import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface UserAttributes extends Model {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  image?: string | null; 
  dateOfBirth?: Date | null; 
}

const User = sequelize.define<UserAttributes>('users', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.TEXT, 
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  
}, {
  timestamps: false,
  tableName: 'users'
});

export {
  User,
  UserAttributes
};
