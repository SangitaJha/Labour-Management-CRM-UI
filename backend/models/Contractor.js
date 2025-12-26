const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contractor = sequelize.define('Contractor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contractor_code: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  contractor_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mobile: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  specialty: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  daily_rate: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  site_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'sites',
      key: 'id'
    }
  }
}, {
  tableName: 'contractors',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Contractor;
