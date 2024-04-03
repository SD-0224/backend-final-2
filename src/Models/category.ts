import { sequelize } from "../config/dbConfig"
import { DataTypes, Model } from "sequelize"

interface categoryAttributes extends Model {
  categoryID: number,
  name: string,
}
const category = sequelize.define<categoryAttributes>('category', {
  categoryID: {
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
  tableName: 'category'
})

export { category, categoryAttributes }