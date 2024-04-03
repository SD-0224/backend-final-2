import { sequelize } from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

interface PaymentAttributes extends Model {
  paymentID: number;
  userID: number;
  paymentDate: string;
  paymentAmount: number;
  paymentMethod: string;
}

const PaymentModel = sequelize.define<PaymentAttributes>('paymentDetails', {
  paymentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Use DataTypes.NOW to set default value to current timestamp
  },
  paymentAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'paymentDetails'
});

export { PaymentModel };
