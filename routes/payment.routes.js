const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// Apply authentication to all routes
// const { authenticate } = require('../middleware/auth');
// router.use(authenticate);

// Payment routes
router.post('/', paymentController.createPayment);
router.get('/', paymentController.getPayments);
router.put('/:id', paymentController.updatePayment);
router.get('/summary', paymentController.getPaymentSummary);

module.exports = router;
