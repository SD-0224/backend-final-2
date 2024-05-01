import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbConfig";
import { Cart } from "./cart"; // Import the Cart model

interface cartItemAttributes extends Model {
  cartItemID: number;
  cartID: number; 
  productID: number;
  productQuantity: number;
  productPrice: number;
  productDiscount:number;
  subTotal:number;
  productTitle: string;
  productSubtitle: string;
}

const CartItem = sequelize.define<cartItemAttributes>('cartItems', {
  cartItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Cart, key: 'cartID' } 
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
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  subTotal: {
    type: DataTypes.FLOAT
  },
}, {
  timestamps: false,
  tableName: 'cartItems'
});

CartItem.beforeCreate((cartItem) => {
  calculateSubTotal(cartItem);
});

CartItem.beforeUpdate((cartItem) => {
  calculateSubTotal(cartItem);
});

function calculateSubTotal(cartItem: cartItemAttributes) {
  const subTotal = cartItem.productPrice * (1 - cartItem.productDiscount) * cartItem.productQuantity;
  cartItem.subTotal = parseFloat(subTotal.toFixed(2));
}

CartItem.belongsTo(Cart, { foreignKey: 'cartID' });

export { CartItem, cartItemAttributes };
