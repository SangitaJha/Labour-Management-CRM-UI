const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');

// Apply authentication to all routes
// const { authenticate } = require('../middleware/auth');
// router.use(authenticate);

// Attendance routes
router.post('/mark', attendanceController.markAttendance);
router.get('/', attendanceController.getAttendance);
router.get('/summary', attendanceController.getAttendanceSummary);
router.put('/:id', attendanceController.updateAttendance);

// Workflow routes (Blueprint: Draft → Submitted → Approved → Paid)
router.post('/:id/submit', attendanceController.submitAttendance);
router.post('/:id/approve', attendanceController.approveAttendance);
router.post('/:id/reject', attendanceController.rejectAttendance);
router.post('/:id/mark-paid', attendanceController.markPaid);

module.exports = router;
