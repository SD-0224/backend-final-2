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
  cartItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }},{
    timestamps: false,
    tableName: 'carts'
  }
  );
  
  export { cart, cartAttributes };