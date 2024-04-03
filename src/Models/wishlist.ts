import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface WishlistAttributes extends Model {
  wishlistID: number;
  userID: number;
  productID: number;
}

const WishlistModel = sequelize.define<WishlistAttributes>('wishList', {
  wishlistID: {
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
}, {
  timestamps: false,
  tableName: 'wishList'
});

export { WishlistModel };
