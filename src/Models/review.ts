import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface ReviewAttributes extends Model {
  reviewID: number;
  userID: number;
  rating: number;
  productID: number;
}

const review = sequelize.define<ReviewAttributes>('reviews', {
  reviewID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 1, // Minimum rating value
      max: 5, // Maximum rating value
    },
  },
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'reviews'
});

export { review, ReviewAttributes };
