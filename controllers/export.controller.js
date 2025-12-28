const fs = require('fs');
const path = require('path');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');

// Simple CSV generation utility
const generateCSV = (headers, rows) => {
  const csvHeaders = headers.join(',');
  const csvRows = rows.map(row => 
    headers.map(header => {
      let value = row[header] || '';
      // Escape quotes and wrap in quotes if contains comma
      value = String(value).replace(/"/g, '""');
      if (String(value).includes(',')) {
        value = `"${value}"`;
      }
      return value;
    }).join(',')
  );
  return [csvHeaders, ...csvRows].join('\n');
};

/**
 * Export attendance data
 */
exports.exportAttendance = async (req, res) => {
  try {
    const { startDate, endDate, projectId, labourId } = req.query;

    let where = {};
    if (startDate) where.attendance_date = { [require('sequelize').Op.gte]: startDate };
    if (endDate) where.attendance_date = { ...where.attendance_date, [require('sequelize').Op.lte]: endDate };
    if (projectId) where.project_id = projectId;
    if (labourId) where.labour_id = labourId;

    const attendances = await Attendance.findAll({ where });

    const headers = [
      'attendance_id',
      'labour_id',
      'project_id',
      'attendance_date',
      'in_time',
      'out_time',
      'total_hours',
      'ot_hours',
      'wage',
      'amount',
      'workflow_status'
    ];

    const rows = attendances.map(att => ({
      attendance_id: att.attendance_id,
      labour_id: att.labour_id,
      project_id: att.project_id,
      attendance_date: att.attendance_date,
      in_time: att.in_time,
      out_time: att.out_time,
      total_hours: att.total_hours,
      ot_hours: att.ot_hours,
      wage: att.wage_per_day,
      amount: att.amount,
      workflow_status: att.workflow_status
    }));

    const csv = generateCSV(headers, rows);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="attendance-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error exporting attendance data' });
  }
};

/**
 * Export payment data
 */
exports.exportPayments = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    let where = {};
    if (startDate) where.createdAt = { [require('sequelize').Op.gte]: startDate };
    if (endDate) where.createdAt = { ...where.createdAt, [require('sequelize').Op.lte]: endDate };
    if (status) where.payment_status = status;

    const payments = await Payment.findAll({ where });

    const headers = ['payment_id', 'attendance_id', 'amount', 'payment_status', 'payment_mode', 'paid_date'];

    const rows = payments.map(pay => ({
      payment_id: pay.payment_id,
      attendance_id: pay.attendance_id,
      amount: pay.amount,
      payment_status: pay.payment_status,
      payment_mode: pay.payment_mode,
      paid_date: pay.paid_date
    }));

    const csv = generateCSV(headers, rows);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="payments-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error exporting payment data' });
  }
};

/**
 * Export daily summary report
 */
exports.exportDailySummary = async (req, res) => {
  try {
    const { date } = req.query;

    const attendances = await Attendance.findAll({
      where: { attendance_date: date || new Date().toISOString().split('T')[0] }
    });

    const headers = [
      'labour_id',
      'attendance_date',
      'total_hours',
      'ot_hours',
      'amount',
      'status'
    ];

    const rows = attendances.map(att => ({
      labour_id: att.labour_id,
      attendance_date: att.attendance_date,
      total_hours: att.total_hours,
      ot_hours: att.ot_hours,
      amount: att.amount,
      status: att.attendance_status
    }));

    const csv = generateCSV(headers, rows);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="daily-summary-${date}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error exporting daily summary' });
  }
};

/**
 * Export monthly wages report
 */
exports.exportMonthlyWages = async (req, res) => {
  try {
    const { month, year } = req.query;

    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();

    const attendances = await Attendance.findAll({
      where: require('sequelize').where(
        require('sequelize').fn('YEAR', require('sequelize').col('attendance_date')),
        '=',
        currentYear
      ),
      attributes: [
        'labour_id',
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'total_days'],
        [require('sequelize').fn('SUM', require('sequelize').col('total_hours')), 'total_hours'],
        [require('sequelize').fn('SUM', require('sequelize').col('ot_hours')), 'total_ot_hours'],
        [require('sequelize').fn('SUM', require('sequelize').col('amount')), 'total_amount']
      ],
      group: ['labour_id'],
      raw: true
    });

    const headers = ['labour_id', 'total_days', 'total_hours', 'total_ot_hours', 'total_amount'];
    const rows = attendances;

    const csv = generateCSV(headers, rows);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="monthly-wages-${currentYear}-${currentMonth}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error exporting monthly wages' });
  }
};
