// Central model registry with associations
const sequelize = require('../config/database');

// Import all models
const User = require('./User');
const Customer = require('./Customer');
const Project = require('./Project');
const Worker = require('./Worker');
const Contractor = require('./Contractor');
const Attendance = require('./Attendance');
const Payment = require('./Payment');
const Site = require('./Site');

// Define associations
Worker.belongsTo(Contractor, { foreignKey: 'contractor_id', as: 'contractor' });
Worker.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
Worker.belongsTo(Site, { foreignKey: 'site_id', as: 'site' });

Contractor.belongsTo(Site, { foreignKey: 'site_id', as: 'site' });
Project.hasMany(Site, { foreignKey: 'project_id', as: 'sites' });
Site.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

Attendance.belongsTo(Worker, { foreignKey: 'worker_id', as: 'worker' });
Attendance.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
Attendance.belongsTo(Site, { foreignKey: 'site_id', as: 'site' });
Attendance.belongsTo(User, { foreignKey: 'marked_by', as: 'markedBy' });

Payment.belongsTo(Worker, { foreignKey: 'worker_id', as: 'worker' });
Payment.belongsTo(User, { foreignKey: 'paid_by', as: 'paidBy' });

// Export all models
module.exports = {
  sequelize,
  User,
  Customer,
  Project,
  Worker,
  Contractor,
  Attendance,
  Payment,
  Site
};
