import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbConfig";
interface cartAttributes extends Model {
  cartID: number;
  userID: number;
  productID: number;
  productQuantity: number;
  isOrdered: boolean;
}

const cart = sequelize.define<cartAttributes>('carts', {
  cartID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
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
  isOrdered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: false,
  tableName: 'carts'
});

export { cart, cartAttributes };
