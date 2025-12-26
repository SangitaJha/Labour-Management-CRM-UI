const express = require('express');
const router = express.Router();
const workerController = require('../controllers/worker.controller');

// Apply authentication to all routes
// const { authenticate } = require('../middleware/auth');
// router.use(authenticate);

// Worker routes
router.get('/workers', workerController.getAllWorkers);
router.get('/workers/:id', workerController.getWorker);
router.post('/workers', workerController.createWorker);
router.put('/workers/:id', workerController.updateWorker);
router.delete('/workers/:id', workerController.deleteWorker);

// Contractor routes
router.get('/contractors', workerController.getAllContractors);
router.post('/contractors', workerController.createContractor);

module.exports = router;
