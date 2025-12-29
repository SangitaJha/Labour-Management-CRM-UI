const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const projectCostController = require('../controllers/projectCost.controller');
const { protect } = require('../middleware/auth');


router.get('/', protect, projectController.getAllProjects);
router.get('/:id', protect, projectController.getProjectById);
router.post('/', protect, projectController.createProject);
router.put('/:id', protect, projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

// Project Cost Calculation (Demo Mode)
router.post('/cost', projectCostController.calculateProjectCost);

module.exports = router;
