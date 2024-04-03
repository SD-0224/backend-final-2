import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface addressAttribute extends Model {
  addressID: number;
  userID: number;
  street: string;
  state: string;
  city: string;
  postalCode: string; // Changed data type to string
}

const address = sequelize.define<addressAttribute>('addresses', {
  addressID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING, // Changed data type to string
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'addresses'
});

export { address, addressAttribute };
