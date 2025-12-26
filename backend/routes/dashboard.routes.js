const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth');

router.get('/stats', protect, dashboardController.getDashboardStats);
router.get('/new-agents', protect, dashboardController.getNewAgents);
router.get('/new-customers', protect, dashboardController.getNewCustomers);

module.exports = router;
