const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  attendance_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'attendances',
      key: 'attendance_id'
    }
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'partial', 'paid'),
    defaultValue: 'pending'
  },
  payment_mode: {
    type: DataTypes.ENUM('cash', 'bank', 'upi'),
    allowNull: true
  },
  paid_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  reference_no: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  }
}, {
  tableName: 'payments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Payment;
