import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Account } from "./Account.js";
import { User } from "./User.js";

export const Operation = sequelize.define("Operation", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
},
{
  // timestamps: false
});

Account.hasMany(Operation, { foreignKey: 'account_id', sourceKey: 'id'});
Operation.belongsTo(Account, { foreignKey: 'account_id', targetKey: 'id', });

User.hasMany(Operation, { foreignKey: 'user_id', sourceKey: 'id'});
Operation.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', });