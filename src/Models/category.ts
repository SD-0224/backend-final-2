import { sequelize } from "../config/dbConfig"
import { DataTypes, Model } from "sequelize"

interface CategoryAttributes extends Model {
  categoryID: number,
  name: string,
}
const CategoryModel = sequelize.define<CategoryAttributes>('category', {
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

export { CategoryModel }