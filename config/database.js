const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Create Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../data/database.sqlite'),
  logging: false // Set to console.log to see SQL queries
});

module.exports = sequelize;
