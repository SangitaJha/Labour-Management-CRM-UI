const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  attendance_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  attendance_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'project_id'
    }
  },
  labour_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'workers',
      key: 'labour_id'
    }
  },
  in_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  out_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  total_hours: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 8.00
  },
  ot_hours: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00
  },
  attendance_status: {
    type: DataTypes.ENUM('present', 'absent', 'half_day', 'leave'),
    defaultValue: 'present'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  work_details: {
    type: DataTypes.JSON,
    allowNull: true
  },
  material_details: {
    type: DataTypes.JSON,
    allowNull: true
  },
  materials_cost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  geo_latitude: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  geo_longitude: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  workflow_status: {
    type: DataTypes.ENUM('draft', 'submitted', 'approved', 'rejected', 'paid'),
    defaultValue: 'draft'
  },
  approval_status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  approved_by: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  approved_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'partial', 'paid'),
    defaultValue: 'pending'
  },
  paid_by: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  paid_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'attendances',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['labour_id', 'attendance_date']
    }
  ]
});

module.exports = Attendance;
