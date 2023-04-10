import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';
import { Account } from './Account.js';

export const User = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

User.hasMany(Account, { foreignKey: 'user_id', sourceKey: 'id', onDelete:'restrict'});
Account.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', });