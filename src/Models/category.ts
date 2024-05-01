import { sequelize } from "../config/dbConfig"
import { DataTypes, Model } from "sequelize"
import slugify from "slugify";

interface categoryAttributes extends Model {
  categoryID: number;
  name: string;
  imagePath: string;
  slug: string;
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
  
  imagePath:
  {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING, // Define slug attribute as a string
    unique: true, // Ensure uniqueness of slugs
  },
}, {
  timestamps: false,
  tableName: 'category'
})
category.beforeCreate((category) => {
  if (category.name) {
    category.slug = slugify(category.name, { lower: true });
  }
});
export { category, categoryAttributes }