const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Worker = sequelize.define('Worker', {
  labour_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  labour_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mobile_no: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  work_type: {
    type: DataTypes.ENUM('mason', 'carpenter', 'electrician', 'plumber', 'painter', 'helper', 'centring', 'sand-filling', 'tiles', 'other'),
    defaultValue: 'helper'
  },
  wage_per_day: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  id_proof_type: {
    type: DataTypes.ENUM('aadhar', 'pan', 'voter_id', 'driving_license', 'other'),
    allowNull: true
  },
  id_proof_number: {
    type: DataTypes.STRING(50),
    allowNull: true
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
  tableName: 'workers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Worker;

