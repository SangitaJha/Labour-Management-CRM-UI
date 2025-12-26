const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');
const { protect } = require('../middleware/auth');

router.get('/', protect, salesController.getAllSales);
router.get('/:id', protect, salesController.getSaleById);
router.post('/', protect, salesController.createSale);
router.put('/:id', protect, salesController.updateSale);

module.exports = router;
