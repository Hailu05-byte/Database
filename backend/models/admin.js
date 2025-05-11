import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Admin = sequelize.define('Admin', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default Admin;
