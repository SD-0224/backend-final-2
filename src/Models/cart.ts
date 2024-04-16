import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbConfig";
interface cartAttributes extends Model {
  cartID: number;
  userID: number;
  productID: number;
  productQuantity: number;
  isOrdered: boolean;
}

const Cart = sequelize.define<cartAttributes>('carts', {
  cartID: {
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
  
  export { Cart, cartAttributes };