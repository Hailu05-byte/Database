import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Product from './product.js';
import User from './user.js';

const Sale = sequelize.define('Sale', {
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  payment_status: {
    type: DataTypes.ENUM('paid', 'pending'),
    defaultValue: 'pending',
  }
}, {
  timestamps: false,
});


Sale.belongsTo(Product, { foreignKey: 'product_id' });
Sale.belongsTo(User, { foreignKey: 'user_id' });

export default Sale;
