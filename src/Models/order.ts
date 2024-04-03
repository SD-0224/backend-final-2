import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface orderAttributes extends Model {
  orderID: number;
  userID: number;
  addressID: number;
  isPaid: boolean;
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
  addressID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'orderDetails'
});

export { order, orderAttributes };
