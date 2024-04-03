import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface OrderAttributes extends Model {
  orderItemID: number;
  orderID: number;
  productID: number;
  price: number; 
}

const orderItem = sequelize.define<OrderAttributes>('orderItems', {
  orderItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: { 
    type: DataTypes.FLOAT
  }
}, {
  timestamps: false,
  tableName: 'orderItems'
});

export { orderItem, OrderAttributes };
