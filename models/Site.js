const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Site = sequelize.define('Site', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  site_code: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  site_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'projects',
      key: 'id'
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  pincode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'sites',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Site;
