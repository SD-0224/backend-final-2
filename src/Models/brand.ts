import { sequelize } from "../config/dbConfig"
import { DataTypes, Model } from "sequelize"
import slugify from "slugify";
// Interface representing the attributes of the brand model
interface brandAttributes extends Model{
    brandID: number;
    name: string;
    imagePath: string;
    slug: string;
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
  slug: {
    type: DataTypes.STRING, // Define slug attribute as a string
    unique: true, // Ensure uniqueness of slugs
  },
}, {
  timestamps: false,
  tableName: 'brand'
}
)

brand.beforeCreate((brand) => {
  if (brand.name) {
    brand.slug = slugify(brand.name, { lower: true });
  }
});

export { brand, brandAttributes }