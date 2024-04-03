import { sequelize } from "../config/dbConfig"
import { DataTypes, Model } from "sequelize"

interface productAttributes extends Model {

     productID: number,
    title: string,
    subTitle: string,
    description: string,
    price: number,
    quantity: number,
    categoryID: number,
    discount: number,
    arrival: string,
    brand: number,
}
const product = sequelize.define<productAttributes>('products', {
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
    type: DataTypes.DATE
  },
  brandID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },


}, {
  timestamps: false,
  tableName: 'products'
})

export { product, productAttributes }