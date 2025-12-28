const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, customerController.getAllCustomers);
router.get('/:id', protect, customerController.getCustomerById);
router.post('/', protect, customerController.createCustomer);
router.put('/:id', protect, customerController.updateCustomer);
router.delete('/:id', protect, authorize('super_admin', 'admin'), customerController.deleteCustomer);

module.exports = router;
