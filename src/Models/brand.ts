import { sequelize } from "../config/dbConfig"
import { DataTypes, Model } from "sequelize"

// Interface representing the attributes of the brand model
interface brandAttributes extends Model{
    brandID: number;
    name: string;
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
}, {
  timestamps: false,
  tableName: 'brand'
}
)

export { brand, brandAttributes }