const { Op } = require('sequelize');
const User = require('../models/User');
const Customer = require('../models/Customer');
const Project = require('../models/Project');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    // Count active and inactive members
    const activeMembers = await User.count({ where: { is_active: true } });
    const inactiveMembers = await User.count({ where: { is_active: false } });

    // Count projects
    const totalProjects = await Project.count();
    
    // Sum plot statistics
    const plotStats = await Project.findAll({
      attributes: [
        [Project.sequelize.fn('SUM', Project.sequelize.col('total_plots')), 'totalPlots'],
        [Project.sequelize.fn('SUM', Project.sequelize.col('vacant_plots')), 'vacantPlots'],
        [Project.sequelize.fn('SUM', Project.sequelize.col('booked_plots')), 'bookedPlots']
      ]
    });

    const stats = {
      activeMembers,
      inactiveMembers,
      totalIncome1: 0, // To be implemented with actual income data
      totalIncome2: 0,
      totalIncome3: 0,
      totalIncome: 0,
      totalWithdraw: 0,
      monthlyWithdraw: 0,
      totalProject: totalProjects,
      totalPlots: plotStats[0].dataValues.totalPlots || 0,
      totalVacantPlots: plotStats[0].dataValues.vacantPlots || 0,
      totalBookedPlots: plotStats[0].dataValues.bookedPlots || 0
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching dashboard stats' });
  }
};

// @desc    Get new agents
// @route   GET /api/dashboard/new-agents
// @access  Private
exports.getNewAgents = async (req, res) => {
  try {
    // Get last 10 users with role 'agent' or 'manager'
    const agents = await User.findAll({
      where: {
        role: { [Op.in]: ['agent', 'manager'] }
      },
      attributes: ['id', 'username', 'full_name', 'created_at'],
      order: [['created_at', 'DESC']],
      limit: 10
    });

    // Format data for table
    const formattedAgents = agents.map((agent, index) => ({
      name: agent.full_name || agent.username,
      code: `AG${String(agent.id).padStart(3, '0')}`,
      sponsor: 'N/A' // To be implemented with agent hierarchy
    }));

    res.json({
      success: true,
      data: formattedAgents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching agents' });
  }
};

// @desc    Get new customers
// @route   GET /api/dashboard/new-customers
// @access  Private
exports.getNewCustomers = async (req, res) => {
  try {
    // Get last 10 customers
    const customers = await Customer.findAll({
      attributes: ['id', 'customer_code', 'full_name', 'mobile', 'created_at'],
      order: [['created_at', 'DESC']],
      limit: 10
    });

    // Format data for table
    const formattedCustomers = customers.map(customer => ({
      code: customer.customer_code || `CU${String(customer.id).padStart(3, '0')}`,
      name: customer.full_name,
      mobile: customer.mobile
    }));

    res.json({
      success: true,
      data: formattedCustomers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching customers' });
  }
};
