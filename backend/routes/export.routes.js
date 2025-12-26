const express = require('express');
const router = express.Router();
const exportController = require('../controllers/export.controller');
const { protect } = require('../middleware/auth');

// All export routes require authentication
router.use(protect);

/**
 * Export endpoints
 */
router.get('/attendance', exportController.exportAttendance);
router.get('/payments', exportController.exportPayments);
router.get('/daily-summary', exportController.exportDailySummary);
router.get('/monthly-wages', exportController.exportMonthlyWages);

module.exports = router;
