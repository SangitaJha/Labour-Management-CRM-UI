const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_code: {
    type: DataTypes.STRING(20),
    unique: true
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    validate: {
      isEmail: true
    }
  },
  mobile: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT
  },
  city: {
    type: DataTypes.STRING(50)
  },
  state: {
    type: DataTypes.STRING(50)
  },
  pincode: {
    type: DataTypes.STRING(10)
  },
  agent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  customer_type: {
    type: DataTypes.ENUM('individual', 'corporate'),
    defaultValue: 'individual'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'customers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Customer;
