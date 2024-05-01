import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";
import slugify from "slugify";
interface productAttributes extends Model {
  productID: number;
  title: string;
  subTitle: string;
  description: string;
  price: number;
  quantity: number;
  categoryID: number;
  discount: number;
  arrival: string;
  brand: number;
  slug: string;
}
const Product = sequelize.define<productAttributes>(
  "products",
  {
    productID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subTitle: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    arrival: {
      type: DataTypes.DATE,
    },
    brandID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING, // Define slug attribute as a string
      unique: true, // Ensure uniqueness of slugs
    },
  },
  {
    timestamps: false,
    tableName: "products",
  }
);
Product.beforeCreate((product) => {
  if (product.title) {
    product.slug = slugify(product.title, { lower: true });
  }
});
export { Product, productAttributes };
