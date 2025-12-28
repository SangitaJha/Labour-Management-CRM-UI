const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  role: {
    type: DataTypes.ENUM('admin', 'manager', 'supervisor', 'accounts'),
    defaultValue: 'supervisor'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  last_login: {
    type: DataTypes.DATE
  },
  last_login_ip: {
    type: DataTypes.STRING(45)
  },
  profile_photo: {
    type: DataTypes.STRING(255)
  },
  address: {
    type: DataTypes.TEXT
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verification_token: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Hash password before saving
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// Method to compare password
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
