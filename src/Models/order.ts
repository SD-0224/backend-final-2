import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface orderAttributes extends Model {
  orderID: number;
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressID: number;
  grandTotal: number;
  status: string;
}

const order = sequelize.define<orderAttributes>('orderDetails', {
  orderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  addressID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grandTotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'orderDetails'
});

export { order, orderAttributes };
