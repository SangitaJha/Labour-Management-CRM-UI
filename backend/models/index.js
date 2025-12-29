
/**
 * Central model registry and associations for Labour Management CRM
 * ---------------------------------------------------------------
 * This file imports all Sequelize models and defines their relationships.
 * It exports all models and the sequelize instance for use throughout the backend.
 */

const sequelize = require('../config/database');

// --- Model Imports ---
const User = require('./User');
const Customer = require('./Customer');
const Project = require('./Project');
const Worker = require('./Worker');
const Contractor = require('./Contractor');
const Attendance = require('./Attendance');
const Payment = require('./Payment');
const Site = require('./Site');
const Supplier = require('./Supplier');

// --- Model Associations ---
// Supplier associations
// Example: Supplier can belong to a Site (customize as needed)
Supplier.belongsTo(Site, { foreignKey: 'site_id', as: 'site' });
// Worker associations
Worker.belongsTo(Contractor, { foreignKey: 'contractor_id', as: 'contractor' });
Worker.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
Worker.belongsTo(Site, { foreignKey: 'site_id', as: 'site' });

// Contractor associations
Contractor.belongsTo(Site, { foreignKey: 'site_id', as: 'site' });

// Project and Site associations
Project.hasMany(Site, { foreignKey: 'project_id', as: 'sites' });
Site.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

// Attendance associations
Attendance.belongsTo(Worker, { foreignKey: 'worker_id', as: 'worker' });
Attendance.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
Attendance.belongsTo(Site, { foreignKey: 'site_id', as: 'site' });
Attendance.belongsTo(User, { foreignKey: 'marked_by', as: 'markedBy' });

// Payment associations
Payment.belongsTo(Worker, { foreignKey: 'worker_id', as: 'worker' });
Payment.belongsTo(User, { foreignKey: 'paid_by', as: 'paidBy' });

/**
 * Exports all models and sequelize instance
 * @type {Object}
 */
module.exports = {
  sequelize,
  User,
  Customer,
  Project,
  Worker,
  Contractor,
  Attendance,
  Payment,
  Site,
  Supplier
};
