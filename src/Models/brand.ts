import { sequelize } from "../config/dbConfig"
import { DataTypes, Model } from "sequelize"

// Interface representing the attributes of the brand model
interface brandAttributes extends Model{
    brandID: number;
    name: string;
    imagePath: string;
  }

  
const brand = sequelize.define<brandAttributes>('brand', {
 brandID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  imagePath:
  {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  tableName: 'brand'
}
)

export { brand, brandAttributes }