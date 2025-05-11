
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: false,
});

export default User;