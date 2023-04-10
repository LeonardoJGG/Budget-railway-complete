import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Account } from "./Account.js";

export const Transfer = sequelize.define('Transfers', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
},{
  timestamps: false
}) 

Account.hasMany(Transfer, { foreignKey: 'account_id', sourceKey: 'id' });
Transfer.belongsTo(Account, { foreignKey: 'account_id', targetKey: 'id' });

Account.hasMany(Transfer, { foreignKey: 'to_account_id', sourceKey: 'id' });
Transfer.belongsTo(Account, { foreignKey: 'to_account_id', targetKey: 'id' });