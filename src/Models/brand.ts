import { sequelize } from "../config/dbConfig"
import { DataTypes, Model } from "sequelize"

// Interface representing the attributes of the Brand model
interface BrandAttributes extends Model{
    brandID: number;
    name: string;
  }

  
const BrandModel = sequelize.define<BrandAttributes>('brand', {
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

export { BrandModel }