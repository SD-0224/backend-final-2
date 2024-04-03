import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface UserInstance extends Model {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  image?: string | null; 
  dateOfBirth?: Date | null; // Make it optional
}

const UserModel = sequelize.define<UserInstance>('users', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.TEXT, 
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'users'
});

export {
  UserModel
};
