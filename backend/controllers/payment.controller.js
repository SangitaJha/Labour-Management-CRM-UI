const Payment = require('../models/Payment');
const Worker = require('../models/Worker');
const Attendance = require('../models/Attendance');
const { Op } = require('sequelize');

// Create payment
exports.createPayment = async (req, res) => {
  try {
    const { worker_id, period_start, period_end, advance_deduction, bonus, other_deductions, payment_method, notes } = req.body;

    // Get attendance records for the period
    const attendances = await Attendance.findAll({
      where: {
        worker_id,
        attendance_date: {
          [Op.between]: [period_start, period_end]
        },
        status: {
          [Op.in]: ['present', 'half_day', 'overtime']
        }
      }
    });

    const days_worked = attendances.length;
    const total_wage = attendances.reduce((sum, att) => sum + parseFloat(att.wage_earned), 0);
    
    const advance = parseFloat(advance_deduction || 0);
    const bonus_amt = parseFloat(bonus || 0);
    const other_ded = parseFloat(other_deductions || 0);
    const net_payment = total_wage - advance - other_ded + bonus_amt;

    // Generate payment code
    const payment_code = `PAY${Date.now()}`;

    const payment = await Payment.create({
      payment_code,
      worker_id,
      payment_date: new Date(),
      period_start,
      period_end,
      days_worked,
      total_wage,
      advance_deduction: advance,
      bonus: bonus_amt,
      other_deductions: other_ded,
      net_payment,
      payment_method,
      payment_status: 'pending',
      paid_by: req.user.id,
      notes
    });

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get payments
exports.getPayments = async (req, res) => {
  try {
    const { worker_id, start_date, end_date, payment_status } = req.query;
    
    const where = {};
    if (worker_id) where.worker_id = worker_id;
    if (payment_status) where.payment_status = payment_status;
    if (start_date && end_date) {
      where.payment_date = {
        [Op.between]: [start_date, end_date]
      };
    }

    const payments = await Payment.findAll({ 
      where, 
      order: [['payment_date', 'DESC']]
    });
    
    res.json({ success: true, data: payments });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update payment status
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }
    await payment.update(req.body);
    res.json({ success: true, data: payment });
  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get payment summary
exports.getPaymentSummary = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    const where = {};
    if (start_date && end_date) {
      where.payment_date = {
        [Op.between]: [start_date, end_date]
      };
    }

    const summary = {
      total_payments: await Payment.count({ where }),
      total_paid: await Payment.sum('net_payment', { where: { ...where, payment_status: 'paid' } }) || 0,
      total_pending: await Payment.sum('net_payment', { where: { ...where, payment_status: 'pending' } }) || 0
    };

    res.json({ success: true, data: summary });
  } catch (error) {
    console.error('Get payment summary error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
