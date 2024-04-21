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
  productQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productSubtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productDiscount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subTotal: {
    type: DataTypes.FLOAT
  }
}, {
  timestamps: true,
  tableName: 'orderItems'
});

export { orderItem, OrderAttributes };
