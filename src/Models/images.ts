import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface ImageAttributes extends Model {
  imageID: number;
  productID: number;
  imgPath: string;
  imageIndex: number; 
}

const ImageModel = sequelize.define<ImageAttributes>('images', {
  imageID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imgPath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageIndex: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'images'
});

export { ImageModel };
